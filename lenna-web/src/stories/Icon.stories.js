import Icon from "../components/Icon.vue";

export default {
  title: "lenna-web/Icon",
  component: Icon
};

const Template = (args) => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: '<icon v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  src: "https://raw.githubusercontent.com/lenna-project/lenna-web/main/src/assets/logo-s.png",
};
