import { LennaPlugin } from '@/models/plugin';
import { PluginModule } from '@/models/plugin_module';
import { Config } from '../models/config';
import { loadConfig, listPlugins } from "@/controllers/storage";

export class PluginManager {

    configs: Config[] = []
    plugins: LennaPlugin[] = []

    filter: string = ""

    constructor(filter: string) {
        this.filter = filter;
    }

    async importPlugin(key: string, url: string) {
        // eslint-disable-next-line no-undef
        return System.import(url).then(async (module: any) => {
            // eslint-disable-next-line no-undef
            await module.init(__webpack_require__.S["default"]);
            return module.get("default").then((plugin: Function) => {
                this.importModule(key, url, plugin());
            });
        });
    }

    async importModule(key: string, url: string, module: PluginModule) {
        const pluginConfig = loadConfig({
            name: key,
            url: url,
            plugin: module,
            enabled: false,
            config: {},
        });
        if (this.filter.length > 0) {
            if (pluginConfig.name.includes(this.filter)) {
                pluginConfig.enabled = true;
                this.configs.push({
                    name: pluginConfig.name,
                    enabled: true,
                    config: pluginConfig.config,
                });
                this.plugins.push(pluginConfig);
            }
        } else {
            this.plugins.push(pluginConfig);
        }
    }

    async importPluginMap(mapUrl: string) {
        const tasks = [];
        const res = await fetch(mapUrl);
        const data = await res.json();
        for (const key in data.imports) {
            const url = data.imports[key];
            tasks.push(
                System.import(key).then((plugin: PluginModule) => {
                    return this.importModule(key, url, plugin);
                })
            );
        }
        return Promise.all(tasks);
    }

    async importPluginsJson(jsonUrl: string) {
        const tasks = [];
        const res = await fetch(jsonUrl);
        const data = await res.json();
        for (const key in data.plugins) {
            const url = data.plugins[key];
            tasks.push(this.importPlugin(key, url));
        }
        return Promise.all(tasks);
    }

    changeConfig(name: string, config: Object) {
        const plugin = this.plugins.find((o: LennaPlugin) => o.name === name);
        if (plugin) {
            plugin.config = config;
        }
    }

    getPlugins(): LennaPlugin[] {
        return this.plugins;
    }
}
