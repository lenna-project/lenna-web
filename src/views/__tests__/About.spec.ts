import { shallowMount } from '@vue/test-utils'

import About from "../About.vue";

test('about', () => {
    const wrapper = shallowMount(About, {
        propsData: {
        }
    })
    expect(wrapper.classes()).toContain('about')
})
