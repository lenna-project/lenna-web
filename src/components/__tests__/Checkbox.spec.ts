import { mount } from '@vue/test-utils'

import Checkbox from "../Checkbox.vue";

test('checked', async () => {
    const wrapper = mount(Checkbox, {
        propsData: {
            checked: false
        }
    })
    let checkboxInput = wrapper.find('input[type="checkbox"]');
    console.log(checkboxInput.html());
    await checkboxInput.trigger("click");
    expect(wrapper.text()).toContain('')
})
