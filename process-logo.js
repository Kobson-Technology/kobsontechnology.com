const Jimp = require('jimp');
const path = require('path');

async function removeBackground() {
    try {
        const inputPath = path.join(__dirname, 'public', 'images', 'logo.jpg');
        const outputPath = path.join(__dirname, 'public', 'images', 'logo.png');

        console.log(`Reading image from: ${inputPath}`);
        const image = await Jimp.read(inputPath);

        // Scan all pixels
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // If pixel is white (or very close to white), make it transparent
            if (red > 230 && green > 230 && blue > 230) {
                this.bitmap.data[idx + 3] = 0; // Alpha channel = 0 (transparent)
            }
        });

        await image.writeAsync(outputPath);
        console.log(`Image saved to: ${outputPath}`);
    } catch (error) {
        console.error('Error processing image:', error);
    }
}

removeBackground();
