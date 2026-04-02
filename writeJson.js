import fs from 'fs/promises';

async function writeJson() {
  try {
    const data = await fs.readFile('parsedVocabulary.json', 'utf8');
    await fs.writeFile('output.json', data);
    console.log('File written successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

writeJson();