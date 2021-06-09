<template>
  <div class="navbar">
    <img id="banner" src="@/assets/banner.png" />
    <router-link to="/">Home</router-link>
    <a href="marketplace">Marketplace</a>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";

$navbar_padding: 20px;

.navbar {
  padding: 0px $navbar_padding;
  position: fixed;
  top: 0;
  width: calc(100% - 2* #{$navbar_padding});
  height: 120px;
  margin: 0;
  overflow: hidden;
  background-color: $nav_background;
  justify-content: flex-end;
  display: flex;
  color: $text_color;
  text-transform: uppercase;
}

.navbar a {
  display: block;
  color: $text_color;
  text-align: center;
  margin: 40px 0px;
  padding: 14px 16px;
  text-decoration: none;
}

.navbar a:hover {
  background-color: $primary_color;
}
.navbar .router-link-active {
  color: white;
  background-color: $primary_color;
}
#banner {
  position: absolute;
  top: 10px;
  left: 40%;
  max-height: 100px;
}
</style>
