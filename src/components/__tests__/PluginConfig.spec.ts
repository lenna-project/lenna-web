import { mount } from '@vue/test-utils'

import PluginConfig from "../PluginConfig.vue";

test('checked', async () => {

    const wrapper = mount(PluginConfig, {
        propsData: {
            defaultConfig: {
                width: 200,
                height: 300
            }
        }
    })
    await wrapper.find('#width').setValue("500")
    expect(wrapper.emitted().changeConfig[1]).toEqual([new Map(Object.entries({
        width: 500,
        height: 300
    }))])
    expect(wrapper.text()).toContain('width')
    expect(wrapper.text()).toContain('height')
})
