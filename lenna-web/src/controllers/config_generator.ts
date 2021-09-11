import YAML from "yaml";
import { LennaPlugin } from "../models/plugin";

const generateBase64Config = (plugins: LennaPlugin[]): string => {
    const configs = [];
    for (const plugin of plugins) {
        if (plugin.enabled) {
            const config: any = plugin.config;
            config.name = plugin.name;
            configs.push(config);
        }
    }
    const config = JSON.stringify(configs);
    return btoa(config);
}

const generateYamlConfig = (plugins: LennaPlugin[]): string => {
    const configs = [];
    for (const plugin of plugins) {
        if (plugin.enabled) {
            const config: any = plugin.config;
            config.name = plugin.name;
            configs.push(config);
        }
    }
    const comment =
        "# https://github.com/lenna-project/lenna-cli\n" +
        "# lenna-cli images_path --config lenna.yml\n";
    const yml_config = YAML.stringify({ pipeline: configs });
    return comment + yml_config;
}

export { generateBase64Config, generateYamlConfig }