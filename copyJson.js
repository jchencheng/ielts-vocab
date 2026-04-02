import fs from 'fs/promises';

async function copyJson() {
  try {
    const data = await fs.readFile('parsedVocabulary.json', 'utf8');
    console.log(data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

copyJson();