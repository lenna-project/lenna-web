export interface PluginModule {
    name(): string,
    defaultConfig(): any,
    ui: any
    icon: any
}