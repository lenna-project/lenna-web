<template>
  <div>
    <button v-on:click="generateConfigUrlBase64" v-if="plugins">
      generate actual config url
    </button>
    <div class="config" v-if="base64config">
      <textarea v-model="base64config" :readonly="true"></textarea>
    </div>

    <button v-on:click="generateLennaConfig">lenna.yml</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LennaPlugin } from "../models/plugin";
import {
  generateBase64Config,
  generateYamlConfig,
} from "../controllers/config_generator";
export default defineComponent({
  name: "ConfigComp",
  props: {
    plugins: {
      type: Array as () => Array<LennaPlugin>,
      required: true,
    },
  },
  data() {
    return {
      url: "https://lenna.app/?config=",
      base64config: "",
    };
  },
  methods: {
    download(filename: string, text: string) {
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
      let config = generateBase64Config(this.plugins);
      this.base64config = this.url + config;
    },
    generateLennaConfig() {
      let lenna_yml = generateYamlConfig(this.plugins);
      this.download("lenna.yml", lenna_yml);
    },
  },
});
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
