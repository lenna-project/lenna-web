import { loadConfig, saveConfig, loadConfigFromParams, addPlugin, listPlugins } from "../storage";
import { LennaPlugin } from '../../models/plugin';
import { Config } from "@/models/config";

test('should save and load', () => {
    const fooPlugin: LennaPlugin = {
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
    const fooPlugin: LennaPlugin = {
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

test('should not load anything from params', () => {
    const fooPlugin: LennaPlugin = {
        name: 'foo',
        enabled: true,
        config: {}
    }

    const barConfig: Config = {
        name: 'bar',
        enabled: false,
        config: {}
    }

    const result = loadConfigFromParams(fooPlugin, [barConfig]);
    expect(result).toEqual(fooPlugin);
})

test('should load anything from params', () => {
    const fooPlugin: LennaPlugin = {
        name: 'foo',
        enabled: true,
        config: {}
    }

    const fooConfig: Config = {
        name: 'foo',
        enabled: false,
        config: {}
    }

    const result = loadConfigFromParams(fooPlugin, [fooConfig]);
    expect(result).toEqual(fooPlugin);
    expect(result.enabled).toBeFalsy();
})

test('should add plugins', () => {
    addPlugin("foo");
    addPlugin("bar");
    const plugins = listPlugins();
    expect(plugins.length).toBe(2);
    expect(plugins).toContain("bar");
})
