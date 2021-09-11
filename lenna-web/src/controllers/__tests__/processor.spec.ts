import { processImages, processImage } from "../processor";

test('should count info messages', async () => {
    let counter = 0;
    await processImages([], [], [], {
        info: (_message: string) => { counter++; },
        success: (_message: string) => { counter++; }
    }, () => { })

    expect(counter).toBe(2);
})

test('should check progress message', async () => {
    let progress = 0;
    await processImage({
        arrayBuffer: async () => ""
    }, [], (p: number) => {
        progress = p;
    });

    expect(progress).toBe(1);
})