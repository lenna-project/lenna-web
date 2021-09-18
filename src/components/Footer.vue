<template>
  <div class="footer">
    <v-footer>
      Convert images online without upload of your data.
      <p>
        &copy; {{ new Date().getFullYear() }} —
        <a href="https://lenna.app"> lenna.app </a>
      </p>
    </v-footer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Footer"
});
</script>
<style scoped>
.footer {
  text-align: center;
}
</style>
