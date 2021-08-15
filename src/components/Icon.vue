<template>
  <div>
    <img id="icon" :src="src" />
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: Object,
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