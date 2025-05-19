const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 确保 public 目录存在
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// 从 SVG 生成不同尺寸的 PNG
async function generateIcons() {
  const svgBuffer = fs.readFileSync(path.join(publicDir, 'logo.svg'));
  
  // 生成 192x192 图标
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'logo192.png'));

  // 生成 512x512 图标
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'logo512.png'));

  // 生成 favicon (32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  console.log('图标生成完成！');
}

generateIcons().catch(console.error); 