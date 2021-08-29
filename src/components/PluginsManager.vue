<template>
  <div class="plugins-manager">
    <draggable class="dragArea list-group plugins" :list="plugins">
      <div class="list-group-item" v-for="item in plugins" :key="item.name">
        <Plugin
          :name="item.name"
          :plugin="item.plugin"
          :url="item.url"
          :defaultConfig="configs"
          @changeEnabled="changeEnabled(item.name, $event)"
          @changeConfig="changeConfig(item.name, $event)"
        />
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import Plugin from "@/components/Plugin.vue";
import { loadConfig, listPlugins } from "@/controllers/storage";
import { useToast } from "vue-toastification";
import {LennaPlugin} from "@/models/plugin";
import { PluginModule } from "@/models/plugin_module";

interface Configs {
    [key: string]: any
}

declare interface PluginsManagerData {
  plugins: LennaPlugin[];
  configs: Configs;
}

export default defineComponent({
  name: "PluginsManager",
  props: {
    filter: String,
    pluginsmap: String,
    pluginsjson: String,
    defaultConfig: Object,
    defaultPlugins: Array as () => Array<string>,
  },
  components: {
    Plugin,
    draggable: VueDraggableNext,
  },
  data(): PluginsManagerData {
    return {
      plugins: [],
      configs: {},
    };
  },
  beforeMount() {
    let tasks = [this.getPluginsmap(), this.getPluginsjson()];
    this.configs = this.defaultConfig || {};
    if (this.defaultPlugins) {
      this.defaultPlugins.forEach((plugin: string) => {
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
    changeEnabled(name: string, enabled: boolean) {
      let plugin = this.plugins.find((o: any) => o.name === name);
      if (plugin) {
        plugin.enabled = enabled;
      }
    },
    changeConfig(name: string, config: Object) {
      let plugin = this.plugins.find((o: LennaPlugin) => o.name === name);
      if (plugin) {
        plugin.config = config;
      }
    },
    raw(comp: any) {
      return comp;
    },
    async importPlugin(key: string, url: string) {
      // eslint-disable-next-line no-undef
      return System.import(url).then(async (module: any) => {
        // eslint-disable-next-line no-undef
        await module.init(__webpack_require__.S["default"]);
        return module.get("default").then((plugin: Function) => {
          let pluginConfig = loadConfig({
            name: key,
            url: url,
            plugin: plugin(),
            enabled: false,
            config: {},
          });
          if (this.filter) {
            if (pluginConfig.name.includes(this.filter)) {
              pluginConfig.enabled = true;
              this.configs.push({
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
            // eslint-disable-next-line no-undef
            System.import(key).then((plugin: PluginModule) => {
              let pluginConfig = loadConfig({
                name: key,
                url: data.imports[key],
                plugin: plugin,
                enabled: false,
                config: {},
              });
              if (this.filter) {
                if (pluginConfig.name.includes(this.filter)) {
                  pluginConfig.enabled = true;
                  this.configs.push({
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
      let tasks = [];
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
