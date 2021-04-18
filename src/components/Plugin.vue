<template>
  <div class="plugin" v-if="plugin">
    <h1>
      <input
        type="checkbox"
        id="checkbox"
        v-on:change="updateEnabled(enabled)"
      />
      <label for="checkbox">{{ plugin.name() }}</label>
    </h1>
    {{ plugin.description() }}
    <div>
      <div v-if="ui && defaultConfig">
        <component
          :key="pluginKey"
          :is="ui"
          :defaultConfig="defaultConfig"
          @changeConfig="updateConfig($event)"
        ></component>
      </div>
      <div v-else>
        <PluginConfig
          :key="pluginKey"
          :defaultConfig="defaultConfig"
          @changeConfig="updateConfig($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {createApp,vcreateCommentVNode, createStaticVNode, defineAsyncComponent, shallowRef} from 'vue';
import PluginConfig from "./PluginConfig.vue";

const createUI = (name, component) => {
  return component;
}

export default {
  name: "Plugin",
  props: {
    name: String,
    plugin: Object,
  },
  components: {
    PluginConfig,
  },
  data() {
    return {
      ui: shallowRef(null),
      processor: null,
      enabled: false,
      keyCounter: 0,
      pluginKey: "",
      defaultConfig: null,
    };
  },
  methods: {
    async loadDefaultConfig() {
      this.plugin.defaultConfig().then((config) => {
        this.defaultConfig = config;
      });
    },
    async loadUI() {
      console.log(this.plugin)
     
        if (this.plugin.ui) {
          this.ui = createUI(this.name, this.plugin.ui);
          console.log(this.ui);
        }
    },
    async updateConfig(config) {
      this.$emit("changeConfig", config);
    },
    async updateEnabled(enabled) {
      this.$emit("changeEnabled", enabled);
    },
  },
  created() {
    this.loadUI();
    this.loadDefaultConfig();
  },
  watch: {
    defaultConfig: {
      handler: function (val) {
        this.keyCounter += 1;
        this.pluginKey = this.name + this.keyCounter;
      },
    },
  },
};
</script>

<style scoped>
.plugin {
  margin: 10px;
  width: 500px;
  background-color: #efcda4;
  border: 1px solid darkgray;
  border-radius: 5px;
}
</style>
