<template>
  <div>
    <img id="icon" :src="src" />
  </div>
</template>
<script lang="ts">
export default {
  props: {
    src: {
      type: [Object, String],
    },
  },
};
</script>
<style scoped lang="scss">
#icon {
  margin: 10px;
  margin-top: 20px;
  height: 96px;
  left: 50%;
}
</style>
