import { shallowMount } from '@vue/test-utils'

import ExhibitPlugin from "../ExhibitPlugin.vue";
import { LennaPlugin } from '../../models/plugin';

test('enabled exhibit plugin', () => {
    const lennaPlugin: LennaPlugin = {
        name: "foo",
        url: "https://example.com/",
        description: "foobar plugin",
        enabled: true,
        config: {},
        icon:
            "https://raw.githubusercontent.com/lenna-project/lenna-web/main/src/assets/logo-s.png",
        plugin: {
            name: () => "foo",
            description: () => "foobar plugin",
            icon: () => "",
            ui: "",
            process: (_config, _img) => { },
            defaultConfig: () => {
                return {
                    width: 100,
                    height: 150,
                };
            }
        }
    };
    const wrapper = shallowMount(ExhibitPlugin, {
        props: {
            plugin: lennaPlugin
        }
    })
    expect(wrapper.classes()).toContain('plugin')
    expect(wrapper.text()).toContain('foo')
    expect(wrapper.find(".description").text()).toContain('foobar plugin')
})
