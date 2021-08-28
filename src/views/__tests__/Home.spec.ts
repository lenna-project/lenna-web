import { shallowMount } from '@vue/test-utils'

import Home from "../Home.vue";

test('home', () => {
    const mockRoute = {
        query: {
        }
    }
    const wrapper = shallowMount(Home, {
        propsData: {
        },
        global: {
            mocks: {
                "$route": mockRoute
            }
        }
    })
    expect(wrapper.classes()).not.toContain('home')
})
