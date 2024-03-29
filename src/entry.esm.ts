import { App, Plugin } from 'vue';
// Import vue components
import * as components from './components/index';
// install function executed by Vue.use()
const install: Exclude<Plugin['install'], undefined> = function installLennaWeb(app: App) {
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
};
// Create module definition for Vue.use()
export default install;
