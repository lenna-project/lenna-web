import Footer from "../components/Footer.vue";

export default {
  title: "lenna-web/Footer",
  component: Footer,
};

const Template = (args) => ({
  components: { Footer },
  setup() {
    return { args };
  },
  template: '<footer v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
