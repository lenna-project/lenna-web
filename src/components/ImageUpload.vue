<template>
  <div class="image-upload">
    <FileUpload
      :multiple="true"
      :drop="true"
      :drop-directory="true"
      extensions="gif,jpg,jpeg,png,webp"
      accept="image/png,image/gif,image/jpeg,image/webp"
      v-model="files"
      @input-filter="inputFilter"
      @input-file="inputFile"
      ref="upload"
      class="file-upload"
    >
      <h3>Drop or select files</h3></FileUpload
    >
    <img v-if="image" :src="image.url" width="250" height="250" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FileUpload from "vue-upload-component";

export default defineComponent({
  components: {
    FileUpload,
  },
  data() {
    return {
      files: [],
      image: null,
    };
  },
  methods: {
    inputFile(newFile, oldFile, prevent) {
      this.image = newFile;
      this.$emit("changeImage", newFile);
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert("Your choice is not a picture");
          return prevent();
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);
        }
      }
    },
  },
});
</script>
<style scoped>
.image-upload {
  margin: 10px;
  width: 300px;
  height: 500px;
  background-color: #e1b5a2;
  border: 1px solid darkgray;
  border-radius: 5px;
  box-shadow: 10px 5px 5px white;
}
.file-upload {
  margin: 10px;
  width: 200px;
  height: 200px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
