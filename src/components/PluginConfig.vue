<template>
  <div class="plugin-config" v-if="config">
    <div v-for="c in config" :key="c.key">
      <div class="parameter">
        <label>{{ c.key }}: </label>
        <input
          type="number"
          :placeholder="c.key"
          v-model="c.value"
          @change="updateConfig()"
          v-bind:id="c.key"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface Configs {
  [key: string]: any;
}

interface Config {
  key: string;
  value: any;
}

declare interface PluginConfigData {
  config: Config[];
}

export default defineComponent({
  name: "PluginConfig",
  props: {
    defaultConfig: Object,
  },
  data(): PluginConfigData {
    return {
      config: [],
    };
  },
  methods: {
    async updateConfig() {
      let config: Configs = {};
      for (let c of this.config) {
        config[c.key] = c.value;
      }
      this.$emit("changeConfig", config);
    },
  },
  created() {
    for (let key in this.defaultConfig) {
      let config = { key: key, value: this.defaultConfig[key] };
      this.config.push(config);
    }
    this.updateConfig();
  },
});
</script>

<style scoped>
.plugin-config {
  margin: 5px;
}
.parameter {
  display: flex;
  justify-content: space-between;
  min-height: 50px;
}
.parameter input {
  min-width: 50px;
  max-width: 100px;
}
</style>
