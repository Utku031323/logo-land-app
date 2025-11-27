import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const logoPath = 'src/assets/reelestate-logo.png';
const outputPath = 'src/assets/reelestate-logo.png';

async function cleanLogo() {
  try {
    console.log('Logo temizleme işlemi başlıyor...');
    
    // Orijinal logoyu oku
    const image = sharp(logoPath);
    const metadata = await image.metadata();
    
    console.log(`Orijinal logo: ${metadata.width}x${metadata.height}, Format: ${metadata.format}`);
    
    // Logoyu işle: beyaz fondu transparan yap
    const buffer = await image
      .ensureAlpha() // Alpha channel ekle
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    const { data, info } = buffer;
    const pixelCount = info.width * info.height;
    
    // Beyaz pikselleri transparan yap (RGB: 255,255,255)
    for (let i = 0; i < pixelCount; i++) {
      const idx = i * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      // Beyaz veya çok açık renkler transparan yap
      if (r > 240 && g > 240 && b > 240) {
        data[idx + 3] = 0; // Alpha = 0 (tamamen transparan)
      }
    }
    
    // İşlenmiş görüntüyü kaydet
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);
    
    console.log(`✓ Logo başarıyla temizlendi: ${outputPath}`);
    console.log('Beyaz fon transparan hale getirildi.');
    
  } catch (error) {
    console.error('Hata:', error.message);
    process.exit(1);
  }
}

cleanLogo();

