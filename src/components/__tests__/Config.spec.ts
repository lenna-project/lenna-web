import { shallowMount } from '@vue/test-utils'

import Config from "../ConfigComp.vue";

test('navbar', () => {
    const wrapper = shallowMount(Config, {
        propsData: {
            plugins: []
        }
    })
    expect(wrapper.classes()).not.toContain('config')
})
