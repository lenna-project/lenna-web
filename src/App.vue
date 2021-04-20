<template>
  <Navbar />
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";
export default defineComponent({
  name: "App",
  components: {
    Navbar,
  },
});
</script>