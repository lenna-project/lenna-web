import { mount } from '@vue/test-utils'

import Icon from "../Icon.vue";

test('no text', () => {
    const wrapper = mount(Icon, {
        props: {
            src: "https://raw.githubusercontent.com/lenna-project/lenna-web/main/src/assets/logo-s.png"
        }
    })
    expect(wrapper.text()).toContain('')
})
