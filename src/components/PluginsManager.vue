<template>
  <div class="plugins-manager">
    <draggable class="dragArea list-group plugins" :list="plugins">
      <div class="list-group-item" v-for="item in plugins" :key="item.name">
        <Plugin
          :name="item.name"
          :plugin="item.plugin"
          :url="item.url"
          :defaultConfig="defaultConfig"
          @changeEnabled="changeEnabled(item.name, $event)"
          @changeConfig="changeConfig(item.name, $event)"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import Plugin from "@/components/Plugin.vue";
import { loadConfig, listPlugins } from "../config";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "PluginsManager",
  props: {
    filter: String,
    pluginsmap: String,
    pluginsjson: String,
    defaultConfig: Object,
    defaultPlugins: Array,
  },
  components: {
    Plugin,
    draggable: VueDraggableNext,
  },
  data() {
    return {
      plugins: [],
    };
  },
  beforeMount() {
    let tasks = [this.getPluginsmap(), this.getPluginsjson()];
    if (this.defaultPlugins) {
      this.defaultPlugins.forEach((plugin) => {
        tasks.push(this.importPlugin(plugin, plugin));
      });
    }
    listPlugins().forEach((plugin) => {
      tasks.push(this.importPlugin(plugin, plugin));
    });
    Promise.all(tasks)
      .then(() => {
        if (this.plugins.length < 1) {
          const toast = useToast();
          toast.warning(
            `No plugin enabled. Find more plugins in the marketplace.`
          );
        }
      })
      .catch(console.log);

    //this.importPlugin("local", "http://localhost:3002/remoteEntry.js");
  },
  methods: {
    changeEnabled(name, enabled) {
      let plugin = this.plugins.find((o) => o.name === name);
      plugin.enabled = enabled;
    },
    changeConfig(name, config) {
      let plugin = this.plugins.find((o) => o.name === name);
      plugin.config = config;
    },
    raw(comp) {
      return comp;
    },
    async importPlugin(key, url) {
      return System.import(url).then(async (module) => {
        await module.init(__webpack_require__.S["default"]);
        return module.get("default").then((plugin) => {
          let pluginConfig = {
            name: key,
            url: url,
            plugin: plugin(),
            enabled: false,
            config: {},
          };
          pluginConfig = loadConfig(pluginConfig);
          if (this.filter) {
            if (pluginConfig.name.includes(this.filter)) {
              pluginConfig.enabled = true;
              this.defaultConfig.push({
                name: pluginConfig.name,
                enabled: true,
                config: pluginConfig.config,
              });
              this.plugins.push(pluginConfig);
            }
          } else {
            this.plugins.push(pluginConfig);
          }
        });
      });
    },
    async getPluginsmap() {
      let tasks = [];
      if (this.pluginsmap) {
        const res = await fetch(this.pluginsmap);
        const data = await res.json();
        for (const key in data.imports) {
          tasks.push(
            System.import(key).then((plugin) => {
              let pluginConfig = {
                name: key,
                url: data.imports[key],
                plugin: plugin,
                enabled: false,
                config: {},
              };
              pluginConfig = loadConfig(pluginConfig);
              if (this.filter) {
                if (pluginConfig.name.includes(this.filter)) {
                  pluginConfig.enabled = true;
                  this.defaultConfig.push({
                    name: pluginConfig.name,
                    enabled: true,
                    config: pluginConfig.config,
                  });
                  this.plugins.push(pluginConfig);
                }
              } else {
                this.plugins.push(pluginConfig);
              }
            })
          );
        }
      }
      return Promise.all(tasks);
    },
    async getPluginsjson() {
      let tasks = []
      if (this.pluginsjson) {
        const res = await fetch(this.pluginsjson);
        const data = await res.json();
        for (const key in data.plugins) {
          let url = data.plugins[key];
          tasks.push(this.importPlugin(key, url));
        }
      }
      return Promise.all(tasks);
    },
  },
});
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";
.plugins-manager {
  background-color: $body_background;
}
.plugins {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
