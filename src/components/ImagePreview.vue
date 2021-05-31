<template>
  <div v-if="images.length > 0" class="image-preview">
    <select v-model="filetype">
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.text"
      >
        {{ option.text }}
      </option>
    </select>
    <button v-on:click="downloadZip">Download as ZIP</button>
    <br />
    <div class="image-container">
      <div
        v-for="(src, index) in imgs"
        :key="index"
        class="pic"
        @click="() => showImg(index)"
      >
        <img height="140" :src="src" />
      </div>
    </div>
    <vue-easy-lightbox
      escDisabled
      moveDisabled
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>
    
<script lang="ts">
import VueEasyLightbox from "vue-easy-lightbox";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { compress, compressAccurately } from "image-conversion";
export default {
  components: {
    VueEasyLightbox,
  },
  props: {
    images: Array,
  },
  data() {
    return {
      imgs: [],
      visible: false,
      index: 0,
      filetype: "png",
      options: [
        { text: "png", value: "png" },
        { text: "jpg", value: "jpg" },
      ],
    };
  },
  methods: {
    createObjectURL(image) {
      return URL.createObjectURL(image);
    },
    async safeImage(cli, file, format) {
      let data = await file
        .arrayBuffer()
        .then((image) => new Uint8Array(image));
      return cli.save(data, format);
    },
    async downloadZip() {
      let cli = await System.import(
        "https://lenna.app/lenna-cli/remoteEntry.js"
      ).then((module) => {
        module.init(__webpack_require__.S["default"]);
        return module.get("default").then((cli) => {
          return cli();
        });
      });

      let zip = new JSZip();
      let promises = this.images.map((image) => {
        let type = `image/${this.filetype}`;

        return this.safeImage(cli, image, this.filetype).then((compressed_image) => {
          let file = new File([compressed_image], image.name, { type });
          return zip.file(
            `${image.name.replace(/(\.[^/.]+)+$/, "")}.${this.filetype}`,
            file
          );
        });
      });
      await Promise.all(promises);
      zip.generateAsync({ type: "blob" }).then(function (blob) {
        saveAs(blob, "images.zip");
      });
    },
    show() {
      this.visible = true;
    },
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
  watch: {
    $props: {
      handler() {
        this.imgs = [];
        this.index = 0;
        this.images.forEach((image) => {
          this.imgs.push(this.createObjectURL(image));
        });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped lang="css">
.image-preview {
  margin: 10px;
  background-color: #efcda4;
  border: 1px solid darkgray;
  border-radius: 5px;
  box-shadow: 10px 5px 5px white;
}
.image-container {
  display: flex;
  flex-wrap: wrap;
  min-width: 400px;
  min-height: 500px;
  max-width: 640px;
  overflow-y: scroll;
}
</style>
