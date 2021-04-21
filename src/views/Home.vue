<template>
  <div class="main">
    <ImageUpload @changeImage="changeImages($event)" />
    <div id="process">
      <button v-if="sourceImage" v-on:click="processImages">
        >>process image>>
      </button>
      <PluginsManager
        ref="pluginsManager"
        :defaultConfig="defaultConfig"
        pluginsmap="https://lenna.app/lenna-plugins/importmap.json"
        pluginsjson="https://lenna.app/lenna-plugins/plugins.json"
      />
    </div>
    <ImagePreview :images="resultImages" />
    <Config v-if="pluginsManager" :plugins="pluginsManager.plugins" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import * as NProgress from "nprogress";
import PluginsManager from "@/components/PluginsManager.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import ImagePreview from "@/components/ImagePreview.vue";
import Config from "@/components/Config.vue";

export default defineComponent({
  name: "Home",
  components: {
    PluginsManager,
    ImageUpload,
    ImagePreview,
    Config,
  },
  data() {
    return {
      defaultConfig: null,
      resultImage: null,
      sourceImage: null,
      sourceImages: [],
      resultImages: [],
    };
  },
  setup: () => {
    const pluginsManager = ref(null);
    return {
      pluginsManager,
    };
  },
  created() {
    if (this.$route.query.config) {
      this.defaultConfig = JSON.parse(atob(this.$route.query.config));
    }
  },
  methods: {
    changeImages(files) {
      this.sourceImage = files.file;
      this.sourceImages.push(this.sourceImage);
    },
    async processImages() {
      this.resultImages = [];
      for (let sourceImage of this.sourceImages) {
        this.process(sourceImage).then((image) => {
          this.resultImage = image;
          this.resultImages.push(image);
        });
      }
      this.sourceImage = null;
      this.sourceImages = [];
    },
    async process(imageFile) {
      NProgress.configure({ parent: "#process" });
      NProgress.start();
      let img = new Uint8Array(await imageFile.arrayBuffer());
      for (let id in this.pluginsManager.plugins) {
        NProgress.inc(0.2);
        let plugin = this.pluginsManager.plugins[id];
        if (plugin.enabled) {
          img = await plugin.plugin.process(plugin.config, img);
        }
      }
      const blob = new Blob([img], { type: "image/png" });
      NProgress.done();
      NProgress.remove();
      return blob;
    },
  },
});
</script>

<style scoped lang="css">
@import "//unpkg.com/nprogress@0.2.0/nprogress.css";
.main {
  padding: 100px;
  display: flex;
  background-color: #5a0d33;
}
button {
  width: 350px;
  color: white;
  background-color: #9c3c53;
  border: 2px solid darkgray;
  border-radius: 15px;
  font-size: 24pt;
  padding: 10px;
}
</style>
