<template>
  <div class="image-preview">
    <div id="save">
      <select v-model="filetype">
        <option
          v-for="option in options"
          :value="option.value"
          :key="option.text"
        >
          {{ option.text }}
        </option>
      </select>
      <p v-on:click="downloadZip">save files</p>
    </div>
    <br />
    <div v-if="imgs.length > 0" class="image-container">
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
import { defineComponent } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useToast } from "vue-toastification";
import { convert } from "@lenna-proj/lenna-cli";
import { ImageSource } from "../models/image";

declare interface FileOption {
  text: string;
  value: string;
}

declare interface ImagePreviewData {
  imgs: string[];
  visible: boolean;
  index: number;
  filetype: string;
  options: Array<FileOption>;
}

export default defineComponent({
  components: {
    VueEasyLightbox,
  },
  props: {
    images: {
      type: Array as () => Array<ImageSource>,
      required: true,
    },
  },
  data(): ImagePreviewData {
    return {
      imgs: [],
      visible: false,
      index: 0,
      filetype: "png",
      options: [
        { text: "png", value: "png" },
        { text: "jpg", value: "jpg" },
        { text: "bmp", value: "bmp" },
        { text: "ico", value: "ico" },
        { text: "gif", value: "gif" },
      ],
    };
  },
  methods: {
    createObjectURL(image: ImageSource) {
      return URL.createObjectURL(image);
    },
    async safeImage(file: any, format: string) {
      let data = await file
        .arrayBuffer()
        .then((image: any) => new Uint8Array(image));
      return convert(data, format);
    },
    async downloadZip() {
      let zip = new JSZip();
      const toast = useToast();
      const imageCount = this.images.length;
      if (imageCount < 1) {
        return;
      }
      let compressedCount = 0;
      toast.info(`compressing of ${this.images.length} images started`);
      let promises = this.images.map((image: ImageSource) => {
        let type = `image/${this.filetype}`;

        return this.safeImage(image, this.filetype).then(
          (compressed_image) => {
            let file = new File([compressed_image], image.name, { type });
            compressedCount++;
            toast.success(
              `compressed ${image.name} ${compressedCount} / ${imageCount} images`
            );
            return zip.file(
              `${image.name.replace(/(\.[^/.]+)+$/, "")}.${this.filetype}`,
              file
            );
          }
        );
      });
      await Promise.all(promises);
      zip.generateAsync({ type: "blob" }).then(function (blob) {
        saveAs(blob, "images.zip");
      });
    },
    show() {
      this.visible = true;
    },
    showImg(index: any) {
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
});
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";
.image-preview {
  margin: 10px;
  width: 300px;
  height: 350px;
  background-color: $background_color;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 10px 5px 5px $shadow;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.image-container {
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}
#save {
  text-transform: uppercase;
  font-size: 14pt;
  cursor: pointer;
  margin: 10px;
}
#save:hover {
  transform: scale(1.05);
}
#save select {
  height: 40px;
  min-width: 60px;
  color: $text_color;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  outline: none;
  background-color: white;
}
</style>
