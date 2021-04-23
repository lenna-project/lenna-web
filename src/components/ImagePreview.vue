<template>
  <div v-if="images.length > 0" class="image-preview">
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
    };
  },
  methods: {
    createObjectURL(image) {
      return URL.createObjectURL(image);
    },
    async downloadZip() {
      let zip = new JSZip();
      this.images.forEach((image, index) => {
        zip.file(`${image.name.replace(/(\.[^/.]+)+$/, "")}.png`, image);
      });
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
