<template>
  <div>
    <Slide>
      <button v-on:click="loadPlugin(pluginUrl)">add plugin</button>
      <input
        v-model="pluginUrl"
        placeholder="https://lenna.app/lenna-plugins/desaturate/remoteEntry.js"
      />
      <br />
      <Config v-if="pluginsManager" :plugins="pluginsManager.plugins" />
      <Help />
    </Slide>
    <div class="main">
      <h1>Convert images online without upload of your data</h1>
      <h2 v-if="just">{{ just }}</h2>
      <div class="top_main">
        <ImageUpload ref="imageUpload" @changeImage="changeImages($event)" />
        <div id="process">
          <button v-on:click="processImages">process images</button>
        </div>
        <ImagePreview :images="resultImages" />
      </div>
      <div class="bottom_main">
        <PluginsManager
          ref="pluginsManager"
          :filter="just"
          :defaultConfig="defaultConfig"
          :defaultPlugins="defaultPlugins"
          pluginsmap="https://lenna.app/lenna-plugins/importmap.json"
          pluginsjson="https://lenna.app/lenna-plugins/plugins.json"
        />
      </div>
      <div id="line">
        <hr />
        <div class="plus radius" v-on:click="onMorePlugins()"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import * as NProgress from "nprogress";
import { Slide } from "vue3-burger-menu";
import { useToast } from "vue-toastification";
import PluginsManager from "@/components/PluginsManager.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import ImagePreview from "@/components/ImagePreview.vue";
import Config from "@/components/Config.vue";
import Help from "@/components/Help.vue";

export default defineComponent({
  name: "Home",
  components: {
    Slide,
    PluginsManager,
    ImageUpload,
    ImagePreview,
    Config,
    Help,
  },
  data() {
    return {
      pluginUrl: "",
      just: null,
      defaultConfig: [],
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
      console.log(this.defaultConfig);
    }
    if (this.$route.query.plugin) {
      this.defaultPlugins = [this.$route.query.plugin];
    }
    if (this.$route.query.just) {
      this.just = this.$route.query.just;
    }
  },
  methods: {
    loadPlugin(pluginUrl) {
      console.log("loaded plugin: ", pluginUrl);
      this.pluginsManager.importPlugin(pluginUrl, pluginUrl);
    },
    onMorePlugins() {
      window.location.replace("/marketplace");
    },
    changeImages(files) {
      this.sourceImages.push(files.file);
    },
    async processImages() {
      const toast = useToast();
      const imageCount = this.sourceImages.length;
      let convertedCount = 0;
      toast.info(`converting ${imageCount} images started`);
      this.resultImages = [];
      let tasks = [];
      for (let sourceImage of this.sourceImages) {
        tasks.push(
          this.process(sourceImage).then((image) => {
            let file = new File([image], sourceImage.name, {
              type: "image/png",
            });
            this.resultImages.push(file);
            convertedCount++;
            toast.success(
              `converted ${convertedCount} of ${imageCount} images`
            );
          })
        );
      }
      this.imageUpload.images = [];
      this.sourceImages = [];
      return Promise.all(tasks).then(() => {
        toast.info(`converted ${convertedCount} images`);
      });
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
@import url("https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap");

.main {
  background-color: $body_background;
  padding: 150px;
  padding-top: 120px;
  text-align: center;
}
.main h1 {
  text-transform: uppercase;
  font-family: "Amatic SC", cursive;
  font-size: 32pt;
}
.main hr {
  margin-top: 10px;
  border: none;
  border-top: 2px dotted blue;
  color: #fff;
  background-color: #fff;
  height: 2px;
  width: 100%;
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
  margin-top: 40%;
  width: 350px;
  align-self: center;
  font-size: 20pt;
  text-transform: uppercase;
  padding: 12px;
  border-radius: 30px;
  border: none;
  box-shadow: 5px 5px 5px $shadow;
}
#line {
  margin-top: 50px;
  position: relative;
}

.plus {
  position: absolute;
  top: -25px;
  left: calc(50% - 20px);

  display: inline-block;
  width: 50px;
  height: 50px;

  background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff), blue;
  background-position: center;
  background-size: 50% 2px, 2px 50%; /*thickness = 2px, length = 50% (25px)*/
  background-repeat: no-repeat;
}
.radius {
  border-radius: 50%;
}
.plus:hover {
  transform: scale(1.1);
}

@media screen and (max-width: 800px) {
  .main {
    margin-top: 120px;
    padding: 0;
  }
  #process button {
    width: 150px;
  }
}
</style>
