import { LennaPlugin } from "../models/plugin";
import { Logger } from "../models/logger";
import { Image } from "../models/image";

const processImages = async (sourceImages: Image[], resultImages: Image[], plugins: LennaPlugin[], logger: Logger, progressCallback: Function) => {

    const imageCount = sourceImages.length;
    let convertedCount = 0;
    logger.info(`converting ${imageCount} images started`);
    resultImages.length = 0;
    const tasks = [];
    for (const sourceImage of sourceImages) {
        tasks.push(
            processImage(sourceImage, plugins, progressCallback).then((image) => {
                const file = new File([image], sourceImage.name, {
                    type: "image/png",
                });
                resultImages.push(file);
                convertedCount++;
                logger.success(
                    `converted ${convertedCount} of ${imageCount} images`
                );
            })
        );
    }
    return Promise.all(tasks).then(() => {
        logger.info(`converted ${convertedCount} images`);
    });
}


const processImage = async (imageFile: any, plugins: LennaPlugin[], progressCallback: Function) => {
    let progress = 0.0;
    let img = new Uint8Array(await imageFile.arrayBuffer());
    for (const plugin of plugins) {
        progressCallback(progress);
        progress += 1 / plugins.length;
        if (plugin.enabled) {
            img = await plugin.plugin?.process(plugin.config, img);
        }
    }
    progressCallback(1.0);
    return img;
}

export { processImages, processImage }
