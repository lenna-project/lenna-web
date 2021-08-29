import { PluginModule } from "./plugin_module";

export interface LennaPlugin {
    name: string;
    url?: string;
    enabled: boolean;
    config: Object;
    plugin?: PluginModule;
    process?: Function;
}