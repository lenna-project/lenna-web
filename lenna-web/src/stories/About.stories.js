import About from "../views/About.vue";

export default {
  title: "lenna-web/About",
  component: About,
};

const Template = (args) => ({
  components: { About },
  setup() {
    return { args };
  },
  template: '<about v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
