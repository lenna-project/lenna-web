import { shallowMount } from '@vue/test-utils'

import Footer from "../Footer.vue";

test('footer', () => {
    const wrapper = shallowMount(Footer, {
        propsData: {
        }
    })
    expect(wrapper.text()).toContain('lenna.app')
})
