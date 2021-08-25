const saveConfig = (plugin) => {
  let config = {
    enabled: plugin.enabled,
    config: plugin.config,
  };
  localStorage.setItem(plugin.name, JSON.stringify(config));
};

const loadConfig = (plugin) => {
  let config = localStorage.getItem(plugin.name);
  if (config) {
    config = JSON.parse(config);
    plugin.enabled = config.enabled;
    plugin.config = Object.assign(plugin.config, config.config);
  }
  return plugin;
};

const loadConfigFromParams = (plugin, params) => {
  params.forEach((config) => {
    if (config.name === plugin.name) {
      console.log(config);
      plugin.enabled = config.enabled;
      plugin.config = Object.assign(plugin.config, config.config);
    }
  });
  return plugin;
};

const listPlugins = () => {
  let plugins = localStorage.getItem("plugins") || "[]";
  return JSON.parse(plugins);
}

export { saveConfig, loadConfig, loadConfigFromParams, listPlugins };
