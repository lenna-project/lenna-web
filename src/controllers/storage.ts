import { LennaPlugin } from "@/models/plugin";
import { Config } from "@/models/config";

const saveConfig = (plugin: LennaPlugin) => {
    const config: Config = {
        name: plugin.name,
        enabled: plugin.enabled,
        config: plugin.config,
    };
    localStorage.setItem(plugin.name, JSON.stringify(config));
};

const loadConfig = (plugin: LennaPlugin): LennaPlugin => {
    const savedConfig = localStorage.getItem(plugin.name);
    if (savedConfig) {
        const config: Config = JSON.parse(savedConfig);
        plugin.enabled = config.enabled;
        plugin.config = Object.assign(plugin.config, config.config);
    }
    return plugin;
};

const loadConfigFromParams = (plugin: LennaPlugin, params: any): LennaPlugin => {
    params.forEach((config: Config) => {
        if (config.name === plugin.name) {
            console.log(config);
            plugin.enabled = config.enabled;
            plugin.config = Object.assign(plugin.config, config.config);
        }
    });
    return plugin;
};

const listPlugins = (): string[] => {
    const plugins = localStorage.getItem("plugins") || "[]";
    return JSON.parse(plugins);
}

export { saveConfig, loadConfig, loadConfigFromParams, listPlugins };
