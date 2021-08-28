const saveConfig = (plugin: LennaPlugin) => {
    let config: Config = {
        name: plugin.name,
        enabled: plugin.enabled,
        config: plugin.config,
    };
    localStorage.setItem(plugin.name, JSON.stringify(config));
};

const loadConfig = (plugin: LennaPlugin): LennaPlugin => {
    let savedConfig = localStorage.getItem(plugin.name);
    if (savedConfig) {
        let config: Config = JSON.parse(savedConfig);
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
    let plugins = localStorage.getItem("plugins") || "[]";
    return JSON.parse(plugins);
}

export { saveConfig, loadConfig, loadConfigFromParams, listPlugins };
