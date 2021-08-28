test('config', () => {
    let config: Config = {
        name: 'foo',
        enabled: true,
        config: {}
    }
    expect(config.enabled).toBeTruthy();
})
