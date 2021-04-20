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

export { saveConfig, loadConfig };
