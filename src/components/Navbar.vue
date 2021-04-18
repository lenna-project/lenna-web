<template>
  <div class="navbar">
    <a href="/">Home</a>
    <a href="https://github.com/lenna-project">Github</a>
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