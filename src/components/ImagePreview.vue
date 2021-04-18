<template>
  <div v-if="images.length > 0" class="image-preview">
    <button v-on:click="downloadZip">Download as ZIP</button>
    <br />
    <div v-for="(img, i) in images" :key="i">
      <img :src="createObjectURL(img)" />
    </div>
  </div>
</template>
    
<script lang="ts">
import { saveAs } from "file-saver";
import JSZip from "jszip";
export default {
  props: {
    images: Array,
  },
  methods: {
    createObjectURL(image) {
      return URL.createObjectURL(image);
    },
    async downloadZip() {
      let zip = new JSZip();
      this.images.forEach((image, index) => {
        zip.file(`image${index}.png`, image);
      });
      zip.generateAsync({ type: "blob" }).then(function (blob) {
        saveAs(blob, "images.zip");
      });
    },
  },
};
</script>
<style scoped lang="css">
.image-preview {
  max-width: 640px;
  max-height: 480px;
  margin: 10px;
  background-color: #efcda4;
  border: 1px solid darkgray;
  border-radius: 5px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.image-preview img {
  max-width: 640px;
  max-height: 480px;
}
</style>
