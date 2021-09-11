import Help from "../components/Help.vue";

export default {
  title: "lenna-web/Help",
  component: Help,
};

const Template = (args) => ({
  components: { Help },
  setup() {
    return { args };
  },
  template: '<help v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
