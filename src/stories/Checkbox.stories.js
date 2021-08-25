import Checkbox from "../components/Checkbox.vue";

export default {
  title: "lenna-web/Checkbox",
  component: Checkbox
};

const Template = (args) => ({
  components: { Checkbox },
  setup() {
    return { args };
  },
  template: '<checkbox v-bind="args" />',
});

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
};
