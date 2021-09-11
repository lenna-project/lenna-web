import ImageUpload from "../components/ImageUpload.vue";

export default {
  title: "lenna-web/ImageUpload",
  component: ImageUpload
};

const Template = (args) => ({
  components: { ImageUpload },
  setup() {
    return { args };
  },
  template: '<image-upload v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
};