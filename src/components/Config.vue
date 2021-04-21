<template>
  <button v-on:click="toggle()" v-if="plugins">c</button>
  <div class="config" v-if="enabled">
    <textarea v-model="base64config" :readonly="true"></textarea>
  </div>
</template>

<script>
export default {
  name: "Plugin",
  props: {
    plugins: Array,
  },
  data() {
    return {
      url: "https://lenna.app/?config=",
      base64config: "",
      enabled: false,
    };
  },
  methods: {
    toggle() {
      this.enabled = !this.enabled;
      this.base64config = this.getConfigUrlBase64();
    },
    getConfigUrlBase64() {
      let plugins = [];
      for (let id in this.plugins) {
        let plugin = this.plugins[id];
        if (plugin.enabled) {
          plugins.push({
            name: plugin.name,
            enabled: plugin.enabled,
            config: plugin.config,
          });
        }
      }
      let config = JSON.stringify(plugins);
      return this.url + btoa(config);
    },
  },
};
</script>

<style scoped>
.config {
  margin: 10px;
  width: 200px;
  height: 300px;
  background-color: #efcda4;
  border: 1px solid darkgray;
  border-radius: 5px;
}
</style>
