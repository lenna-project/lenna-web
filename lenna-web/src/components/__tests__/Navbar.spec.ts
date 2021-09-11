import { shallowMount } from '@vue/test-utils'

import Navbar from "../Navbar.vue";

test('navbar', () => {
    const wrapper = shallowMount(Navbar, {
        propsData: {
        }
    })
    expect(wrapper.classes()).toContain('navbar')
})
