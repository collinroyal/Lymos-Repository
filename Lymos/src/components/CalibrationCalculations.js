import { Image } from "react-native";

export default function extractRGBData(imageURI) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Enable cross-origin resource sharing
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = this.width;
            canvas.height = this.height;
            ctx.drawImage(this, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let rTotal = 0, gTotal = 0, bTotal = 0;
            for (let i = 0; i < imageData.data.length; i += 4) {
                rTotal += imageData.data[i];
                gTotal += imageData.data[i + 1];
                bTotal += imageData.data[i + 2];
            }
            const numPixels = imageData.data.length / 4;
            const rAverage = Math.round(rTotal / numPixels);
            const gAverage = Math.round(gTotal / numPixels);
            const bAverage = Math.round(bTotal / numPixels);
            resolve({ r: rAverage, g: gAverage, b: bAverage });
        };
        img.onerror = function() {
            reject(new Error("Failed to load image"));
        };
        img.src = imageURI;
    });
}

