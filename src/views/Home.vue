<template>
  <div id="circle"></div>
  <Slide>
    <button v-on:click="loadPlugin(pluginUrl)">add plugin</button>
    <input
      v-model="pluginUrl"
      placeholder="https://lenna.app/lenna-plugins/desaturate/remoteEntry.js"
    />
    <br />
    <Config v-if="pluginsManager" :plugins="pluginsManager.plugins" />
  </Slide>
  <div class="main">
    <h1>Convert images online without upload of your data</h1>
    <div class="top_main">
      <ImageUpload ref="imageUpload" @changeImage="changeImages($event)" />
      <div id="process">
        <button v-on:click="processImages">
          PROCESS IMAGE
        </button>
      </div>
      <ImagePreview :images="resultImages" />
    </div>
    <div class="bottom_main">
    <PluginsManager
      ref="pluginsManager"
      :defaultConfig="defaultConfig"
      :defaultPlugins="defaultPlugins"
      pluginsmap="https://lenna.app/lenna-plugins/importmap.json"
      pluginsjson="https://lenna.app/lenna-plugins/plugins.json"
    />
    </div>
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
      sourceImages: [],
      resultImages: [],
    };
  },
  setup: () => {
    const imageUpload = ref(null);
    const pluginsManager = ref(null);
    return {
      imageUpload,
      pluginsManager,
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
      console.log("loaded plugin: ", pluginUrl);
      this.pluginsManager.importPlugin(pluginUrl, pluginUrl);
    },
    changeImages(files) {
      this.sourceImages.push(files.file);
    },
    async processImages() {
      this.resultImages = [];
      for (let sourceImage of this.sourceImages) {
        this.process(sourceImage).then((image) => {
          let file = new File([image], sourceImage.name, { type: "image/png" });
          this.resultImages.push(file);
        });
      }
      this.imageUpload.images = [];
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

      NProgress.done();
      NProgress.remove();
      return img;
    },
  },
});
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "//unpkg.com/nprogress@0.2.0/nprogress.css";
#circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid $shadow;
  background-color: $body_background;
  position: absolute;
  top: -25px;
  left: -25px;
}
#circle:hover {
  transform: scale(1.1);
}
.main {
  background-color: $body_background;
  padding: 150px;
  padding-top: 120px;
  text-align: center;
}
.main h1 {
  text-transform: uppercase;
}
.top_main {
  display: flex;
  justify-content: space-between;
}
.bottom_main {
  padding-top: 20px;
  padding-bottom: 0;
}
#process button {
  margin-top: 50%;
  width: 350px;
  align-self: center;
  font-size: 24pt;
  padding: 12px;
  border-radius: 30px;
  border: none;
  box-shadow: 5px 5px 5px $shadow;
}
</style>
