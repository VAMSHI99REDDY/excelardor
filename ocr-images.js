const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/AllProjects');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

async function recognizeImages() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
      console.log(`\n=== File: ${file} ===\n${text.trim().substring(0, 200)}`);
    } catch (err) {
      console.error(`Error reading ${file}:`, err.message);
    }
  }
}

recognizeImages();
