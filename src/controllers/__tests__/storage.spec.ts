import { loadConfig, saveConfig } from "../storage";

test('should save and load', () => {
    let fooPlugin: LennaPlugin = {
        name: 'foo',
        enabled: true,
        config: {}
    }

    saveConfig(fooPlugin);

    let loadedPlugin: LennaPlugin = {
        name: 'foo',
        enabled: false,
        config: {}
    }

    loadedPlugin = loadConfig(loadedPlugin);
    expect(loadedPlugin.enabled).toBeTruthy();
})

test('should load non existing', () => {
    let fooPlugin: LennaPlugin = {
        name: 'foo',
        enabled: true,
        config: {}
    }

    let loadedPlugin: LennaPlugin = {
        name: 'foo',
        enabled: false,
        config: {}
    }

    loadedPlugin = loadConfig(fooPlugin);
    expect(loadedPlugin.enabled).toBeTruthy();
})
