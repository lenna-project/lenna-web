<template>
  <button v-on:click="generateConfigUrlBase64" v-if="plugins">
    generate actual config url
  </button>
  <div class="config" v-if="base64config">
    <textarea v-model="base64config" :readonly="true"></textarea>
  </div>

  <button v-on:click="generateLennaConfig">lenna.yml</button>
</template>

<script>
import YAML from "yaml";
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
    download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
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
    generateLennaConfig() {
      let plugins = [];
      for (let id in this.plugins) {
        let plugin = this.plugins[id];
        if (plugin.enabled) {
          let config = plugin.config;
          config.id = plugin.plugin.name();
          plugins.push(config);
        }
      }
      let comment = "# https://github.com/lenna-project/lenna-cli\n"
      + "# lenna-cli images_path --config lenna.yml\n"
      let lenna_yml = YAML.stringify({"pipeline": plugins });
      this.download("lenna.yml", comment + lenna_yml);
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
