<template>
  <div class="about">
    <h1>About Lenna Project</h1>
    <p>
      Lenna is a library for image processing algorithms. The web page allows to
      test and use them.
    </p>
    <Help />
    <h2>Thanks</h2>
      <ul>
        <li>Silvia (<a href="https://github.com/silvia-odwyer/photon">photon</a>)</li>
      </ul>
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
        
    <h2>Jupyter Notebooks</h2>
    View some notebooks <a href="/jupyter">here</a> to see how the plugins can be used in python.
    
    <h2>Command Line Interface</h2>
    <iframe src="https://snapcraft.io/lenna-cli/embedded?button=black&summary=true" frameborder="0" width="100%" height="380px" style="border: 1px solid #CCC; border-radius: 2px;"></iframe>
    <p>
      A command line interface allows to use the algorithms and run them on
      multiple images at once. The source for
      <a href="https://github.com/lenna-project/lenna-cli">lenna-cli</a>
      can be found on github.
    </p>
    <img src="https://raw.githubusercontent.com/lenna-project/lenna-cli/main/docs/images/run.gif" />

    <h2>Desktop App</h2>
    <a href="https://sourceforge.net/projects/lenna/files/latest/download"><img alt="Download lenna" src="https://a.fsdn.com/con/app/sf-download-button" width=276 height=48 srcset="https://a.fsdn.com/con/app/sf-download-button?button_size=2x 2x"></a>
    <br />
    <iframe src="https://snapcraft.io/lenna/embedded?button=black&summary=true&screenshot=true" frameborder="0" width="100%" height="620px" style="border: 1px solid #CCC; border-radius: 2px;"></iframe>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Help from "@/components/Help.vue";

export default defineComponent({
  name: "About",
  components: {
    Help,
  },
});
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";
.about {
  padding: 100px;
  padding-left: 30%;
  background-color: $body_background;
  height: 100%;
}
</style>
