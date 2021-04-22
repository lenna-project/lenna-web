<template>
  <div class="plugins-manager">
    <draggable class="dragArea list-group w-full" :list="plugins">
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

export default defineComponent({
  name: "PluginsManager",
  props: {
    pluginsmap: String,
    pluginsjson: String,
    defaultConfig: Object,
    defaultPlugins: Array
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
    try {
      this.getPluginsmap();
      this.getPluginsjson();
    } catch (error) {
      console.log(error);
    }
    if(this.defaultPlugins) {
      this.defaultPlugins.forEach(plugin => {
        this.importPlugin(plugin, plugin);
      })
    }
    this.importPlugin("filter", "http://localhost:3002/remoteEntry.js");
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
    importPlugin(key, url) {
      System.import(url).then((module) => {
        module.init(__webpack_require__.S["default"]);
        module.get("default").then((plugin) => {
          let pluginConfig = {
            name: key,
            url: url,
            plugin: plugin(),
            enabled: false,
            config: {},
          };
          this.plugins.push(pluginConfig);
        });
      });
    },
    async getPluginsmap() {
      if (this.pluginsmap) {
        const res = await fetch(this.pluginsmap);
        const data = await res.json();
        for (const key in data.imports) {
          System.import(key).then((plugin) => {
            let pluginConfig = {
              name: key,
              url: data.imports[key],
              plugin: plugin,
              enabled: false,
              config: {},
            };
            this.plugins.push(pluginConfig);
          });
        }
      }
    },
    async getPluginsjson() {
      if (this.pluginsjson) {
        const res = await fetch(this.pluginsjson);
        const data = await res.json();
        for (const key in data.plugins) {
          let url = data.plugins[key];
          this.importPlugin(key, url);
        }
      }
    },
  },
});
</script>

<style>
.plugins-manager {
  background-color: #e1b5a2;
}
</style>
