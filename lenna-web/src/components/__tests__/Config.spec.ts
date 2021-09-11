import { shallowMount } from '@vue/test-utils'

import { Config } from "..";

test('navbar', () => {
    const wrapper = shallowMount(Config, {
        props: {
            plugins: []
        }
    })
    expect(wrapper.classes()).not.toContain('config')
})
