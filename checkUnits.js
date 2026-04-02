import fs from 'fs/promises';

async function checkUnits() {
  try {
    // 读取parsedVocabulary.json文件
    const content = await fs.readFile('parsedVocabulary.json', 'utf8');
    const data = JSON.parse(content);
    
    // 检查每个单元的单词数量
    data.forEach((unit, index) => {
      console.log(`Unit ${index + 1}: ${unit.name} - ${unit.words.length} words`);
      if (unit.words.length > 200) {
        console.log(`  -> 需要拆分，单词数量超过200`);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUnits();
