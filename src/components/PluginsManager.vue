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
import Plugin from "../components/Plugin.vue";
import {LennaPlugin} from "../models/plugin";
import { PluginManager } from "../controllers/plugin_manager";

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
    pluginsmap: String,
    pluginsjson: String,
    defaultConfig: Object,
    pluginManager: Object as () => PluginManager,
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
    
    this.plugins = this.pluginManager?.getPlugins() || [];
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
