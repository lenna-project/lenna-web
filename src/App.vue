<template>
  <Navbar />
  <router-view />
  <Footer />
</template>
<script>
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default defineComponent({
  name: "App",
  components: {
    Navbar,
    Footer
  },
});
</script>