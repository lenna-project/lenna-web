import { mount } from '@vue/test-utils'

import Checkbox from "../Checkbox.vue";

test('checked', async () => {
    const wrapper = mount(Checkbox, {
        propsData: {
            checked: false
        }
    })
    const checkboxInput = wrapper.find('input[type="checkbox"]');
    await checkboxInput.trigger("click");
    expect(wrapper.text()).toContain('')
})
