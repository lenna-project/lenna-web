<template>
  <div class="about">
    <h1>About Lenna Project</h1>
    <p>
      Lenna is a library for image processing algorithms. The web page allows to
      test and use them.
    </p>
    <h2>Plugins</h2>
    <p>
      Lenna allows to plug in more algorithms. 
      The plugins can be activated for use in the <a href="https://lenna.app/marketplace/">marketplace</a>. 
      Some examples can be found at
      <a href="https://github.com/lenna-project/lenna-plugins"
        >lenna-project/lenna-plugins</a
      >
      on github.
      <br/>
      Following a list of available plugins:

      <ul>
      <li><b>blur</b> - Blurs the image. The strength can be configured.</li>
      <li><b>dramatic</b> - Gives the image a dramatic touch.</li>
      <li><b>exif</b> - Allows to clear exif data of the image.</li>
      <li><b>rotate</b> - Rotates the image.</li>
      <li><b>canny</b> - Shows edges of objects in the image.</li>
      </ul>
    </p>
    <h2>Command Line Interface</h2>
    <p>
      A command line interface allows to use the algorithms and run them on
      multiple images at once. The source for
      <a href="https://github.com/lenna-project/lenna-cli">lenna-cli</a>
      can be found on github.
    </p>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/_variables.scss";
.about {
  padding: 100px;
  padding-left: 30%;
  background-color: $body_background;
  height: 100%;
}
</style>
