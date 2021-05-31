<template>
  <div class="plugin" v-if="plugin">
    <h1>
      <input
        type="checkbox"
        id="checkbox"
        v-model="enabled"
        v-on:change="updateEnabled(enabled)"
      />
      <label for="checkbox">{{ plugin.name() }}</label>
    </h1>
    {{ plugin.description() }}
    <div v-if="enabled">
      <div v-if="ui && config">
        <component
          :key="pluginKey"
          :is="ui"
          :defaultConfig="config"
          @changeConfig="updateConfig($event)"
        ></component>
      </div>
      <div v-else>
        <PluginConfig
          :key="pluginKey"
          :defaultConfig="config"
          @changeConfig="updateConfig($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { shallowRef } from "vue";
import PluginConfig from "./PluginConfig.vue";
import { loadConfig, loadConfigFromParams, saveConfig } from "@/config";

const createUI = (name, component) => {
  return component;
};

export default {
  name: "Plugin",
  props: {
    name: String,
    plugin: Object,
    url: String,
    defaultConfig: Object,
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
      config: null,
    };
  },
  methods: {
    async loadDefaultConfig() {
      this.plugin.defaultConfig().then((defaultConfig) => {
        if (this.defaultConfig) {
          const { enabled, config } = loadConfigFromParams(
            {
              name: this.name,
              config: defaultConfig,
            },
            this.defaultConfig
          );
          this.config = config;
          this.enabled = enabled;
        } else {
          const { enabled, config } = loadConfig({
            name: this.name,
            config: defaultConfig,
          });
          this.config = config;
          this.enabled = enabled;
        }
      });
    },
    async loadUI() {
      if (this.plugin.ui && this.url) {
        System.import(this.url)
          .then((module) => {
            module.get("./Widget").then((widget) => {
              this.ui = createUI(this.name, widget().default);
            });
          })
          .catch((e) => console.log(e));
      }
    },
    async updateConfig(config) {
      saveConfig({
        name: this.name,
        enabled: this.enabled,
        config: config,
      });
      this.$emit("changeConfig", config);
    },
    async updateEnabled(enabled) {
      saveConfig({
        name: this.name,
        enabled: this.enabled,
        config: this.config,
      });
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
