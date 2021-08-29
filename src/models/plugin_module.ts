export interface PluginModule {
    name(): string,
    description(): string,
    defaultConfig(): any,
    ui: any
    icon(): any
}