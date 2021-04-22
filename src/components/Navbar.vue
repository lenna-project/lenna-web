<template>
  <div class="navbar">
    <router-link to="/">Home</router-link>
    <a href="https://github.com/lenna-project">Github</a>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #723d67;
  justify-content: flex-end;
  display: flex;
}

.navbar a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.navbar a:hover {
  background-color: #111;
}
</style>
