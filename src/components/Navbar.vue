<template>
  <div class="navbar">
    <router-link to="/">Home</router-link>
    <a href="marketplace">Marketplace</a>
    <a href="https://github.com/lenna-project">Github</a>
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
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100px;
  margin: 0;
  overflow: hidden;
  background-color: $nav_background;
  justify-content: flex-end;
  display: flex;
  color: $text_color;
}

.navbar a {
  display: block;
  color: $text_color;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.navbar a:hover {
  background-color: $primary_color;
}
</style>
