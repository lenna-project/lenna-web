<template>
  <div class="plugin" v-if="plugin">
    <div>
      <img id="icon" v-if="icon && !enabled" :src="icon" />
    </div>
    <div>
      <h2 for="checkbox">{{ plugin.name() }}</h2>
      <div class="checkbox-container">
        <label class="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            v-model="enabled"
            v-on:change="updateEnabled(enabled)"
          />
          <span></span>
        </label>
      </div>
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
.checkbox-container {
  height: 50px;
}

.checkbox {
  cursor: pointer;
  position: relative;
}

.checkbox > input {
  height: 40px;
  width: 50px;
  position: absolute;
  left: -25px;
  top: 0rem;
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
  font-size: 2.4em;
  content: "\2713";
  text-align: center;
  color: white;
  position: absolute;
  left: -0.5rem;
  top: 0rem;
}

.checkbox > input:active {
  border: 2px solid #34495e;
}

#icon {
  margin: 10px;
  margin-top: 20px;
  height: 96px;
  left: 50%;
}
</style>
