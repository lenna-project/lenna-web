<template>
  <button v-on:click="generateConfigUrlBase64" v-if="plugins">
    generate config url
  </button>
  <div class="config" v-if="base64config">
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
    };
  },
  methods: {
    generateConfigUrlBase64() {
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
      this.base64config = this.url + btoa(config);
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
