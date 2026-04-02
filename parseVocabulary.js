import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 读取vocabulary.txt文件
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vocabularyPath = path.join(__dirname, 'vocabulary.txt');
const content = fs.readFileSync(vocabularyPath, 'utf8');

// 解析文件内容
const lines = content.split('\n');
const units = [];
let currentUnit = null;
let currentWords = [];
let wordId = 1;
let i = 0;

// 处理所有主题
while (i < lines.length) {
  const line = lines[i].trim();
  
  // 检查是否是新主题的开始（以Chapter-开头）
  if (line.startsWith('Chapter-')) {
    // 保存当前单元
    if (currentUnit) {
      currentUnit.words = currentWords;
      units.push(currentUnit);
      currentUnit = null;
      currentWords = [];
    }
    
    // 创建新单元
    const unitName = line;
    currentUnit = {
      id: `unit-${units.length + 1}`,
      name: `Unit ${units.length + 1}: ${unitName}`,
      words: []
    };
    currentWords = [];
    i++;
    
    // 跳过"单词 解释"行
    if (i < lines.length && lines[i].trim() === '单词\t解释') {
      i++;
    }
  } else if (line && line !== '---') {
    // 解析单词
    const parts = line.split('\t');
    if (parts.length >= 2) {
      const english = parts[0].trim();
      const rest = parts[1].trim();
      if (english && rest) {
        // 提取词性和中文释义
        const posMatch = rest.match(/^([a-z\.]+)\s+(.*)$/i);
        let partOfSpeech = '';
        let chinese = rest;
        if (posMatch) {
          partOfSpeech = posMatch[1];
          chinese = posMatch[2];
        }
        
        const word = {
          id: `temp-${wordId++}`,
          english,
          phonetic: '', // 没有音标信息
          partOfSpeech,
          chinese,
          example: '' // 没有例句信息
        };
        
        currentWords.push(word);
      }
    }
    i++;
  } else {
    i++;
  }
}

// 添加最后一个单元
if (currentUnit) {
  currentUnit.words = currentWords;
  units.push(currentUnit);
}

// 处理超过150词的单元，拆分为多个单元
const finalUnits = [];
let globalWordId = 1;

for (let i = 0; i < units.length; i++) {
  const unit = units[i];
  if (unit.words.length > 150) {
    // 计算需要拆分成几个单元，尽量平均分配
    const totalWords = unit.words.length;
    const totalParts = Math.ceil(totalWords / 150);
    // 计算每个单元平均应该有多少单词
    const baseSize = Math.floor(totalWords / totalParts);
    const remainder = totalWords % totalParts;
    
    let currentIndex = 0;
    for (let j = 0; j < totalParts; j++) {
      // 前remainder个单元多分配一个单词，使拆分更平均
      const partSize = j < remainder ? baseSize + 1 : baseSize;
      const start = currentIndex;
      const end = start + partSize;
      const partWords = unit.words.slice(start, end).map((word, idx) => ({
        ...word,
        id: `word-${finalUnits.length + 1}-${globalWordId++}`
      }));
      const part = {
        ...unit,
        id: `unit-${finalUnits.length + 1}`,
        name: totalParts > 1 ? `${unit.name} - Part ${j + 1}` : unit.name,
        words: partWords
      };
      finalUnits.push(part);
      currentIndex = end;
    }
  } else {
    unit.id = `unit-${finalUnits.length + 1}`;
    unit.words = unit.words.map(word => ({
      ...word,
      id: `word-${finalUnits.length + 1}-${globalWordId++}`
    }));
    finalUnits.push(unit);
  }
}

// 保留测试单元
finalUnits.push({
  "id": "unit-test",
  "name": "Test Unit",
  "words": [
    {
      "id": "word-test-1",
      "english": "atmosphere",
      "phonetic": "/ˈætməsfɪə(r)/",
      "partOfSpeech": "n.",
      "chinese": "大气层；氛围",
      "example": "The approaching examination created a tense atmosphere on the campus"
    },
    {
      "id": "word-test-2",
      "english": "hydrosphere",
      "phonetic": "/ˈhaɪdrəʊsfɪə(r)/",
      "partOfSpeech": "n.",
      "chinese": "水圈；大气中的水汽",
      "example": "All the water in the earth's surface is included in the hydrosphere"
    }
  ],
  "article": "This is a test unit with only two words from unit1 for manual testing."
});

// 输出结果到文件
const outputPath = path.join(__dirname, 'parsedVocabulary.json');
fs.writeFileSync(outputPath, JSON.stringify(finalUnits, null, 2));
console.log(`Output written to ${outputPath}`);
