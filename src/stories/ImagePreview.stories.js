import ImagePreview from "../components/ImagePreview.vue";

export default {
  title: "lenna-web/ImagePreview",
  components: [ImagePreview],
};

const Template = (args) => ({
  components: { ImagePreview },
  setup() {
    return { args };
  },
  template: '<image-preview v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  images: [new File([new Uint8Array("")], "test.png")],
};
