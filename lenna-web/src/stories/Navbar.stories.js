import Navbar from "../components/Navbar.vue";

export default {
  title: "lenna-web/Navbar",
  component: Navbar,
};

const Template = (args) => ({
  components: { Navbar },
  setup() {
    return { args };
  },
  template: '<div><navbar v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {};
