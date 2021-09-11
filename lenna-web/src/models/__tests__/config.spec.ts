import {Config} from "@/models/config"
test('config', () => {
    const config: Config = {
        name: 'foo',
        enabled: true,
        config: {}
    }
    expect(config.enabled).toBeTruthy();
})
