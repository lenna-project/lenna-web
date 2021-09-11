<template>
  <div>
  <Navbar />
  <router-view />
  <Footer />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Navbar } from "@lenna-proj/lenna-web";
import { Footer } from "@lenna-proj/lenna-web";
export default defineComponent({
  name: "App",
  components: {
    Navbar,
    Footer
  },
});
</script>