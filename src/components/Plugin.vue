<template>
  <div class="plugin" v-if="plugin">
    <img id="icon" v-if="icon" :src="icon" />

    <h2 for="checkbox">{{ plugin.name() }}</h2>
    <label class="checkbox">
      <input
        type="checkbox"
        id="checkbox"
        v-model="enabled"
        v-on:change="updateEnabled(enabled)"
      />
      <span>Check Me</span>
    </label>
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
  padding: 5px;
  min-width: 250px;
  min-height: 250px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 5px 5px $shadow;
  text-align: center;
}
.plugin h2 {
  font-size: 1.4em;
}
.checkbox {
  cursor: pointer;
  position: relative;
}

.checkbox > span {
  color: white;
  padding: 0.5rem 0.25rem;
}

.checkbox > input {
  height: 35px;
  width: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border-radius: 25px;
  outline: none;
  transition-duration: 0.3s;
  background-color: #a2f6f2;
  cursor: pointer;
}

.checkbox > input:checked {
  background-color: #a2f6f2;
}

.checkbox > input:checked + span::before {
  content: "\2713";
  display: block;
  text-align: center;
  color: white;
  position: absolute;
  left: 0.8rem;
  top: -0.7rem;
}

.checkbox > input:active {
  border: 2px solid #34495e;
}

#icon {
  margin: 10px;
  width: 48px;
  height: 48px;
}
</style>
