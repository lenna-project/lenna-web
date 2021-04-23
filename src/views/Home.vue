<template>
  <div id="circle"></div>
  <Slide>
    <button v-on:click="loadPlugin(pluginUrl)">add plugin</button>
    <input
      v-model="pluginUrl"
      placeholder="https://lenna.app/lenna-plugins/desaturate/remoteEntry.js"
    />
    <br/>
    <Config v-if="pluginsManager" :plugins="pluginsManager.plugins" />
  </Slide>
  <div class="main">
    <ImageUpload 
    ref="imageUpload"
    @changeImage="changeImages($event)" />
    <div id="process">
      <button v-if="sourceImage" v-on:click="processImages">
        >>process image>>
      </button>
      <PluginsManager
        ref="pluginsManager"
        :defaultConfig="defaultConfig"
        :defaultPlugins="defaultPlugins"
        pluginsmap="https://lenna.app/lenna-plugins/importmap.json"
        pluginsjson="https://lenna.app/lenna-plugins/plugins.json"
      />
    </div>
    <ImagePreview :images="resultImages" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import * as NProgress from "nprogress";
import { Slide } from "vue3-burger-menu";
import PluginsManager from "@/components/PluginsManager.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import ImagePreview from "@/components/ImagePreview.vue";
import Config from "@/components/Config.vue";

export default defineComponent({
  name: "Home",
  components: {
    Slide,
    PluginsManager,
    ImageUpload,
    ImagePreview,
    Config,
  },
  data() {
    return {
      pluginUrl: "",
      defaultConfig: null,
      defaultPlugins: null,
      resultImage: null,
      sourceImage: null,
      sourceImages: [],
      resultImages: [],
    };
  },
  setup: () => {
    const imageUpload = ref(null);
    const pluginsManager = ref(null);
    return {
      imageUpload,
      pluginsManager
    };
  },
  created() {
    if (this.$route.query.config) {
      this.defaultConfig = JSON.parse(atob(this.$route.query.config));
    }
    if (this.$route.query.plugin) {
      this.defaultPlugins = [this.$route.query.plugin];
    }
  },
  methods: {
    loadPlugin(pluginUrl) {
      console.log(pluginUrl);
      this.pluginsManager.importPlugin(pluginUrl, pluginUrl);
    },
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
      this.imageUpload.image = null;
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
#circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid #5a0d33;
  background-color: #723d67;
  position: absolute;
  top: -25px;
  left: -25px;
}
#circle:hover {
  transform: scale(1.1);
}
.main {
  padding: 100px;
  display: flex;
  background-color: #5a0d33;
}
.main button {
  width: 350px;
  font-size: 24pt;
  padding: 10px;
}
</style>
