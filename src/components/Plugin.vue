<template>
  <div class="plugin" v-if="plugin">
    <Icon v-if="icon && !enabled" :src="icon" />
    <div>
      <h2>{{ plugin.name() }}</h2>
      <Checkbox v-model:checked="enabled" />
    </div>
    <div v-if="enabled">
      <span>{{ plugin.description() }}</span>
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
import Checkbox from "./Checkbox.vue";
import Icon from "./Icon.vue";
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
    Checkbox,
    Icon,
    PluginConfig,
  },
  data() {
    return {
      ui: shallowRef(null),
      icon: shallowRef(null),
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
        if (this.defaultConfig && this.defaultConfig.length > 0) {
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
      if (this.plugin.icon) {
        this.icon = this.plugin.icon();
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
<style scoped lang="scss">
@import "@/styles/_variables.scss";
.plugin {
  margin: 10px;
  padding: 10px;
  min-width: 250px;
  min-height: 250px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 5px 5px $shadow;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.plugin:hover {
  box-shadow: 10px 10px 5px $shadow;
  transform: scale(1.1);
}
.plugin h2 {
  font-weight: normal;
  font-style: normal;
  font-size: 14pt;
  text-transform: uppercase;
}
</style>
