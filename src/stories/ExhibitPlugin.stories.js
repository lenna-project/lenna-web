import ExhibitPlugin from "../components/ExhibitPlugin.vue";

export default {
  title: "lenna-web/ExhibitPlugin",
  component: ExhibitPlugin,
};

const Template = (args) => ({
  components: { ExhibitPlugin },
  setup() {
    let arg = args.plugin;

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
    arg.plugin = plugin;
    return {
      args: {
        plugin: arg,
      },
    };
  },
  template: '<exhibit-plugin v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  filter: "foo",
  plugin: {
    name: "foo",
    description: "foobar plugin",
    url: "https://example.com/",
    icon:
      "https://raw.githubusercontent.com/lenna-project/lenna-web/main/src/assets/logo-s.png",
  },
};
