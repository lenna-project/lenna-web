import PluginsManager from "../components/PluginsManager.vue";
import { PluginManager } from "../controllers/plugin_manager";

export default {
  title: "lenna-web/PluginsManager",
  component: PluginsManager,
};

const Template = (args) => ({
  components: { PluginsManager },
  setup() {
    const pluginManager = new PluginManager("");
    console.log(pluginManager);
    pluginManager.plugins = [args.plugin];

    const plugin = {
      name: () => args.plugin.name,
      description: () => args.plugin.description,
      icon: () => args.plugin.icon,
      defaultConfig: () => {
        return {
          width: 100,
          height: 150,
        };
      },
    };
    pluginManager.plugins[0].plugin = plugin;
    console.log(pluginManager.getPlugins());
    return {
      args: {
        pluginManager,
      },
    };
  },
  template: '<plugins-manager v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  filter: "foo",
  plugin: {
    name: "foo",
    description: "foobar plugin",
    enabled: true,
    url: "http://example.com",
    icon:
      "https://raw.githubusercontent.com/lenna-project/lenna-web/main/src/assets/logo-s.png",

    config: {
      width: 200,
      height: 300,
    },
  },
};
