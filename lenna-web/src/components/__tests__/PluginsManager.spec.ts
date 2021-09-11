import { shallowMount } from '@vue/test-utils'

import PluginsManager from "../PluginsManager.vue";

test('pluginsmanager', () => {
    const wrapper = shallowMount(PluginsManager, {
        propsData: {
        }
    })
    expect(wrapper.classes()).toContain('plugins-manager')
})
