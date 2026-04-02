import fs from 'fs/promises';

async function updateDataService() {
  try {
    // 读取parsedVocabulary.json文件
    const vocabularyData = await fs.readFile('parsedVocabulary.json', 'utf8');
    const units = JSON.parse(vocabularyData);
    
    // 为每个单元添加article属性
    const unitsWithArticle = units.map(unit => ({
      ...unit,
      article: unit.article || `This is ${unit.name}. Please read the article and learn the vocabulary.`
    }));
    
    // 读取dataService.ts文件
    const dataServiceContent = await fs.readFile('src/dataService.ts', 'utf8');
    
    // 替换defaultUnits变量
    const updatedContent = dataServiceContent.replace(
      /const defaultUnits: Unit\[\] = \[[\s\S]*?\];/, 
      `const defaultUnits: Unit[] = ${JSON.stringify(unitsWithArticle, null, 2)};`
    );
    
    // 写回dataService.ts文件
    await fs.writeFile('src/dataService.ts', updatedContent);
    console.log('dataService.ts updated successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

updateDataService();
