import PluginConfig from "../components/PluginConfig.vue";

export default {
  title: "lenna-web/PluginConfig",
  component: PluginConfig
};

const Template = (args) => ({
  components: { PluginConfig },
  setup() {
    return { args };
  },
  template: '<plugin-config v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  defaultConfig: {
    width: "200",
    height: 300
  }
};