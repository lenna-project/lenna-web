import YAML from "yaml";
import { LennaPlugin } from '../../models/plugin';

import { generateBase64Config, generateYamlConfig } from '../config_generator';

test('should generate yaml', () => {
    const fooPlugin: LennaPlugin = {
        name: 'foo',
        enabled: true,
        config: {}
    }

    const barPlugin: LennaPlugin = {
        name: 'bar',
        enabled: false,
        config: {}
    }

    const yaml_config = generateYamlConfig([fooPlugin, barPlugin]);

    expect(yaml_config).toContain('foo');
    expect(yaml_config).not.toContain('bar');

    const doc = YAML.parse(yaml_config);

    console.log(doc);
    expect(doc.pipeline.length).toBe(1);
})


test('should generate base64', () => {
    const fooPlugin: LennaPlugin = {
        name: 'foo',
        enabled: true,
        config: {}
    }

    const barPlugin: LennaPlugin = {
        name: 'bar',
        enabled: false,
        config: {}
    }

    const b64_config = generateBase64Config([fooPlugin, barPlugin]);
    const config = JSON.parse(atob(b64_config));
    expect(config.length).toBe(1);
})
