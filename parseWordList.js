import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前模块的路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取单词表文件
const wordListPath = path.join(__dirname, 'IELTS Word List.txt');
const content = fs.readFileSync(wordListPath, 'utf8');

// 解析单词表
function parseWordList(content) {
  const lines = content.split('\n');
  const wordLists = [];
  let currentList = null;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // 检查是否是新的 Word List
    const listMatch = trimmedLine.match(/Word List (\d+)/);
    if (listMatch) {
      const listNumber = parseInt(listMatch[1]);
      currentList = {
        id: `list-${listNumber}`,
        number: listNumber,
        words: []
      };
      wordLists.push(currentList);
    } else if (currentList && trimmedLine) {
      // 解析单词行
      // 格式: 单词   音标   词性   释义
      const parts = trimmedLine.split(/\s+/);
      if (parts.length >= 4) {
        let word = parts[0];
        let phonetic = '';
        let partOfSpeech = '';
        let chinese = '';
        let example = '';
        
        // 提取音标
        let i = 1;
        while (i < parts.length && (parts[i].startsWith('/') || parts[i].startsWith('[') || parts[i].startsWith('{'))) {
          phonetic += parts[i] + ' ';
          i++;
        }
        phonetic = phonetic.trim();
        
        // 提取词性
        if (i < parts.length && (parts[i].endsWith('*') || parts[i].endsWith('.') || parts[i].endsWith('n.') || parts[i].endsWith('v.') || parts[i].endsWith('a.') || parts[i].endsWith('ad.') || parts[i].endsWith('prep.') || parts[i].endsWith('conj.') || parts[i].endsWith('pron.') || parts[i].endsWith('num.') || parts[i].endsWith('int.'))) {
          partOfSpeech = parts[i].replace('*', '');
          i++;
        }
        
        // 提取中文释义
        while (i < parts.length && !parts[i].match(/^[A-Z]/)) {
          chinese += parts[i] + ' ';
          i++;
        }
        chinese = chinese.trim();
        
        // 提取例句（如果有）
        if (i < parts.length) {
          example = parts.slice(i).join(' ');
        }
        
        if (word && chinese) {
          currentList.words.push({
            id: `word-${currentList.number}-${currentList.words.length + 1}`,
            english: word,
            phonetic: phonetic,
            partOfSpeech: partOfSpeech,
            chinese: chinese,
            example: example
          });
        }
      }
    }
  }
  
  return wordLists;
}

// 生成学术文章
function generateArticle(words) {
  const topics = [
    "Educational Research",
    "Environmental Science",
    "Technological Innovation",
    "Health and Medicine",
    "Economic Development",
    "Cultural Exchange",
    "Scientific Discovery",
    "Social Issues"
  ];
  
  const topic = topics[Math.floor(Math.random() * topics.length)];
  let article = `In the field of ${topic}, researchers have been studying various phenomena to understand their implications. `;
  
  // 随机使用一些单词
  const usedWords = new Set();
  const sampleWords = words.sort(() => Math.random() - 0.5).slice(0, Math.min(10, words.length));
  
  sampleWords.forEach(word => {
    usedWords.add(word.english);
    article += `The concept of ${word.english} has been widely discussed in recent studies. `;
  });
  
  article += `Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings.`;
  
  return article;
}

// 解析单词表
const wordLists = parseWordList(content);

// 每两个 list 为一个单元
const units = [];
for (let i = 0; i < wordLists.length; i += 2) {
  const list1 = wordLists[i];
  const list2 = wordLists[i + 1];
  
  const unitWords = [...(list1?.words || []), ...(list2?.words || [])];
  const unitArticle = generateArticle(unitWords);
  
  units.push({
    id: `unit-${Math.floor(i / 2) + 1}`,
    name: `Unit ${Math.floor(i / 2) + 1}: Word Lists ${list1?.number || ''}${list2 ? ` & ${list2.number}` : ''}`,
    words: unitWords,
    article: unitArticle
  });
}

// 生成 dataService.ts 内容
const dataServiceContent = `import { UserData, Unit, TestResult } from './types';

const STORAGE_KEY = 'ielts-pwa-data';

// 从 IELTS Word List.txt 解析的数据
const defaultUnits: Unit[] = ${JSON.stringify(units, null, 2)};

// 初始化数据
export const initializeData = (): UserData => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Failed to parse stored data:', error);
    }
  }
  
  const initialData: UserData = {
    units: defaultUnits,
    testResults: [],
    currentUnitId: 'unit-1'
  };
  
  saveData(initialData);
  return initialData;
};

// 保存数据
export const saveData = (data: UserData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 获取数据
export const getData = (): UserData => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Failed to parse stored data:', error);
    }
  }
  return initializeData();
};

// 保存测试结果
export const saveTestResult = (unitId: string, score: number, total: number): void => {
  const data = getData();
  const testResult: TestResult = {
    unitId,
    score,
    total,
    date: new Date().toISOString()
  };
  data.testResults.push(testResult);
  saveData(data);
};

// 获取单元的最高分数
export const getHighestScore = (unitId: string): number => {
  const data = getData();
  const unitResults = data.testResults.filter(result => result.unitId === unitId);
  if (unitResults.length === 0) return 0;
  return Math.max(...unitResults.map(result => result.score));
};

// 获取单元的测试次数
export const getTestCount = (unitId: string): number => {
  const data = getData();
  return data.testResults.filter(result => result.unitId === unitId).length;
};

// 更新当前单元
export const setCurrentUnit = (unitId: string): void => {
  const data = getData();
  data.currentUnitId = unitId;
  saveData(data);
};
`;

// 写入 dataService.ts 文件
const dataServicePath = path.join(__dirname, 'src', 'dataService.ts');
fs.writeFileSync(dataServicePath, dataServiceContent);

console.log('Word list parsed and dataService.ts updated successfully!');
console.log(`Created ${units.length} units from ${wordLists.length} word lists.`);
