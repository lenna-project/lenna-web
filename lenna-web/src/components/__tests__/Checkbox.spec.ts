import { mount } from '@vue/test-utils'

import {CheckBox} from "..";

test('checked', async () => {
    const wrapper = mount(CheckBox, {
        props: {
            checked: false
        }
    })
    const checkboxInput = wrapper.find('input[type="checkbox"]');
    await checkboxInput.trigger("click");
    expect(wrapper.text()).toContain('')
})
