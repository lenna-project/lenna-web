<template>
  <div class="plugin" v-if="plugin">
    <div>
      <img id="icon" v-if="icon" :src="icon" />
    </div>
    <div class="name">{{ plugin.name }}</div>
    <div class="description">
      {{ plugin.description }}
    </div>
    <div>
      <button v-on:click="addPlugin(plugin)"><span></span></button>
    </div>
    <div class="bottom">
      {{ plugin.author }}
      <a v-bind:href="plugin.homepage">Homepage</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useToast, POSITION } from "vue-toastification";
import { addPlugin } from "../controllers/storage";
import { LennaPlugin } from "../models/plugin";

export default defineComponent({
  name: "ExhibitPlugin",
  props: {
    plugin: Object as () => LennaPlugin,
  },
  data() {
    return {
      icon: "",
    };
  },
  methods: {
    addPlugin(plugin: LennaPlugin) {
      const toast = useToast();
      console.log("plugin added: ", plugin.name);
      if (plugin.url) {
        addPlugin(plugin.url);
        toast.success(`Plugin ${plugin.name} available now.`, {
          position: POSITION.TOP_LEFT,
        });
      }
    },
    async loadIcon() {
      if (this.plugin?.icon) {
        this.icon = this.plugin.icon;
      } else if (this.plugin?.url) {
        // eslint-disable-next-line no-undef
        System.import(this.plugin.url)
          .then((module: any) => {
            module.get("default").then((plugin: any) => {
              let m = plugin();
              if (m.icon) {
                this.icon = m.icon();
              }
            });
          })
          .catch((e: any) => console.log(e));
      } else {
        this.icon =
          "https://raw.githubusercontent.com/lenna-project/lenna-web/main/src/assets/logo-s.png";
      }
    },
  },
  created() {
    this.loadIcon();
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";
.plugin {
  margin: 25px;
  padding: 30px;
  min-width: 250px;
  min-height: 250px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 1px 5px 5px 5px $shadow;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#icon {
  margin: 10px;
  height: 96px;
}
.name {
  text-transform: uppercase;
}
.description {
  margin: 5px;
}
.bottom {
  visibility: hidden;
  display: flex;
  justify-content: space-between;
}
.plugin:hover .bottom {
  visibility: visible;
}
.plugin button {
  color: white;
  background-color: #a2f6f2;
  width: 50px;
  min-height: 30px;
  font-size: 16pt;
}
.plugin button span:after {
  content: "add";
}
.plugin button:hover span:after {
  transform: scale(0.9);
  content: "\2713";
}
</style>