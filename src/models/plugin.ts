/* istanbul ignore file */
export interface LennaPlugin {
    name: string;
    url?: string;
    enabled: boolean;
    config: Object;
    plugin?: any;
}
