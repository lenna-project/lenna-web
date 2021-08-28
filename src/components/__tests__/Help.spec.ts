import { shallowMount } from '@vue/test-utils'

import Help from "../Help.vue";

test('help', () => {
    const wrapper = shallowMount(Help, {
        propsData: {
        }
    })
    expect(wrapper.classes()).toContain('help')
})
