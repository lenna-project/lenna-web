<template>
  <div class="plugins-manager">
    <draggable class="dragArea list-group w-full" :list="plugins">
      <div class="list-group-item" v-for="item in plugins" :key="item.name">
        <Plugin
          :name="item.name"
          :plugin="item.plugin"
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
import Plugin from "./Plugin.vue";
export default defineComponent({
  name: "PluginsManager",
  props: {
    pluginsmap: String,
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
    this.getPluginsmap();
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
    async getPluginsmap() {
      const res = await fetch(this.pluginsmap);
      const data = await res.json();
      for (const key in data.imports) {
        System.import(key).then((plugin) => {
          this.plugins.push({
            name: key,
            url: data.imports[key],
            plugin: plugin,
            enabled: false,
            config: {},
          });
        });
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
