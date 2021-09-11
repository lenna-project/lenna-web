import { PluginModule } from '../../models/plugin_module';
import { PluginManager } from "../plugin_manager";

test('should filter module', () => {
    const fooPlugin: PluginModule = {
        name: () => 'foo',
        description: () => "foo",
        defaultConfig: () => {},
        ui: null,
        icon: () => "",
        process: () => {}
    }

    const barPlugin: PluginModule = {
        name: () => 'bar',
        description: () => "bar",
        defaultConfig: () => {},
        ui: null,
        icon: () => "",
        process: () => {}
    }

    const pluginManager: PluginManager = new PluginManager("bar");
    pluginManager.importModule("foo", "", fooPlugin);
    expect(pluginManager.getPlugins().length).toBe(0);

    pluginManager.importModule("bar", "", barPlugin);
    expect(pluginManager.getPlugins().length).toBe(1);

})

test('should change config', () => {
    const fooPlugin: PluginModule = {
        name: () => 'foo',
        description: () => "foo",
        defaultConfig: () => {},
        ui: null,
        icon: () => "",
        process: () => {}
    }

    const fooConfig = {
        name: "foo",
        width: 200,
        height: 300
    }

    const pluginManager: PluginManager = new PluginManager("");
    pluginManager.importModule("foo", "", fooPlugin);
    expect(pluginManager.getPlugins().length).toBe(1);

    expect(pluginManager.getPlugins()[0].config).toEqual({});
    pluginManager.changeConfig("foo", fooConfig);
    expect(pluginManager.getPlugins()[0].config).toMatchObject({
        width: 200,
        height: 300
    })
})
