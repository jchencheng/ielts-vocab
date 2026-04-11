import { UserData, Unit, TestResult, TestProgress, LearningProgress, ArticleReadingProgress, Word } from './types';
import { unit1Article, unit2Article, unit3Article, ArticleSection } from './articleData';
import { indexedDbService } from './indexedDbService';

const STORAGE_KEY = 'ielts-pwa-data';
const DATA_VERSION_KEY = 'ielts-pwa-data-version';
// 数据版本号，每次更新单词数据时递增
const CURRENT_DATA_VERSION = '2.2.0-force-refresh';

// 从 parsedVocabulary.json 导入的数据
import defaultUnits from './vocabularyData.json';

// 处理单元数据，添加文章
const processedUnits: Unit[] = (defaultUnits as any[]).map((unit, index) => {
  // 为每个单元分配对应的文章
  let article: any = unit.article;
  if (!article) {
    // 根据单元索引分配文章
    if (index === 0) {
      article = unit1Article;
    } else if (index === 1) {
      article = unit2Article;
    } else if (index === 2) {
      article = unit3Article;
    } else {
      // 为其他单元生成默认文章
      article = {
        english: `This is a sample article for ${unit.name}. It contains vocabulary words from this unit to help you learn in context.`,
        chinese: `这是${unit.name}的示例文章。它包含本单元的词汇，帮助你在语境中学习。`,
        paragraphs: unit.words.slice(0, 10).map((word: any) => ({
          english: `The word "${word.english}" is an important vocabulary word. ${word.example || ''}`,
          chinese: `单词"${word.chinese}"是一个重要的词汇。`
        }))
      };
    }
  }

  return {
    ...unit,
    article
  };
});

// 检查是否需要更新数据
const shouldUpdateData = (): boolean => {
  const storedVersion = localStorage.getItem(DATA_VERSION_KEY);
  return storedVersion !== CURRENT_DATA_VERSION;
};

// 保存数据版本
const saveDataVersion = (): void => {
  localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
};

// 初始化数据
export const initializeData = async (): Promise<UserData> => {
  // 检查数据版本，如果需要更新则清除旧数据
  if (shouldUpdateData()) {
    console.log('Data version changed, updating to new version:', CURRENT_DATA_VERSION);
    try {
      await indexedDbService.clearData();
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.log('No old data to clear');
    }
    saveDataVersion();

    // 使用新的默认数据
    const initialData: UserData = {
      units: processedUnits,
      testResults: [],
      testProgress: [],
      currentUnitId: processedUnits[0]?.id || '',
      wrongWords: []
    };

    await indexedDbService.saveData(initialData);
    return initialData;
  }

  try {
    // 尝试从 IndexedDB 获取数据
    const storedData = await indexedDbService.getData();
    if (storedData && storedData.units && storedData.units.length > 0) {
      return storedData;
    }
  } catch (error) {
    console.log('No data in IndexedDB, initializing with default data');
  }

  // 尝试从 localStorage 获取数据（兼容旧版本）
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    try {
      const parsedData = JSON.parse(localData);
      // 迁移到 IndexedDB
      await indexedDbService.saveData(parsedData);
      return parsedData;
    } catch (error) {
      console.error('Failed to parse localStorage data:', error);
    }
  }

  // 使用默认数据
  const initialData: UserData = {
    units: processedUnits,
    testResults: [],
    testProgress: [],
    currentUnitId: processedUnits[0]?.id || '',
    wrongWords: []
  };

  await indexedDbService.saveData(initialData);
  return initialData;
};

// 保存数据
export const saveData = async (data: UserData): Promise<void> => {
  try {
    await indexedDbService.saveData(data);
  } catch (error) {
    console.error('Error saving data to IndexedDB:', error);
    // 降级到 localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

// 获取数据
export const getData = async (): Promise<UserData> => {
  return initializeData();
};

// 保存测试结果
export const saveTestResult = async (unitId: string, score: number, total: number): Promise<void> => {
  const data = await getData();
  const testResult: TestResult = {
    unitId,
    score,
    total,
    date: new Date().toISOString()
  };
  data.testResults.push(testResult);
  await saveData(data);
};

// 获取单元的最高分数
export const getHighestScore = async (unitId: string): Promise<number> => {
  const data = await getData();
  const unitResults = data.testResults.filter(result => result.unitId === unitId);
  if (unitResults.length === 0) return 0;
  return Math.max(...unitResults.map(result => result.score));
};

// 获取单元的测试次数
export const getTestCount = async (unitId: string): Promise<number> => {
  const data = await getData();
  return data.testResults.filter(result => result.unitId === unitId).length;
};

// 更新当前单元
export const setCurrentUnit = async (unitId: string): Promise<void> => {
  const data = await getData();
  data.currentUnitId = unitId;
  await saveData(data);
};

// 保存测试进度
export const saveTestProgress = async (progress: TestProgress): Promise<void> => {
  const data = await getData();
  const existingIndex = data.testProgress.findIndex(p => p.unitId === progress.unitId);
  if (existingIndex >= 0) {
    data.testProgress[existingIndex] = progress;
  } else {
    data.testProgress.push(progress);
  }
  await saveData(data);
};

// 获取测试进度
export const getTestProgress = async (unitId: string): Promise<TestProgress | null> => {
  const data = await getData();
  return data.testProgress.find(p => p.unitId === unitId) || null;
};

// 清除测试进度
export const clearTestProgress = async (unitId: string): Promise<void> => {
  const data = await getData();
  data.testProgress = data.testProgress.filter(p => p.unitId !== unitId);
  await saveData(data);
};

// 保存学习进度
export const saveLearningProgress = async (progress: Omit<LearningProgress, 'lastLearningTime'>): Promise<void> => {
  const data = await getData();
  data.lastLearningProgress = {
    ...progress,
    lastLearningTime: new Date().toISOString()
  };
  await saveData(data);
};

// 获取学习进度
export const getLearningProgress = async (): Promise<LearningProgress | null> => {
  const data = await getData();
  return data.lastLearningProgress || null;
};

// 保存文章阅读进度
export const saveArticleReadingProgress = async (progress: ArticleReadingProgress): Promise<void> => {
  const data = await getData();
  if (!data.articleReadingProgress) {
    data.articleReadingProgress = [];
  }
  const existingIndex = data.articleReadingProgress.findIndex(p => p.unitId === progress.unitId);
  if (existingIndex >= 0) {
    data.articleReadingProgress[existingIndex] = progress;
  } else {
    data.articleReadingProgress.push(progress);
  }
  await saveData(data);
};

// 获取文章阅读进度
export const getArticleReadingProgress = async (unitId: string): Promise<ArticleReadingProgress | null> => {
  const data = await getData();
  return data.articleReadingProgress?.find(p => p.unitId === unitId) || null;
};

// 标记段落为已读
export const markParagraphAsRead = async (unitId: string, sectionIndex: number, paragraphIndex: number): Promise<void> => {
  const data = await getData();
  if (!data.articleReadingProgress) {
    data.articleReadingProgress = [];
  }

  let progress = data.articleReadingProgress.find(p => p.unitId === unitId);
  if (!progress) {
    progress = {
      unitId,
      readParagraphs: [],
      lastReadTime: new Date().toISOString()
    };
    data.articleReadingProgress.push(progress);
  }

  const existingIndex = progress.readParagraphs.findIndex(
    p => p.sectionIndex === sectionIndex && p.paragraphIndex === paragraphIndex
  );

  if (existingIndex < 0) {
    progress.readParagraphs.push({
      sectionIndex,
      paragraphIndex,
      isRead: true,
      readTime: new Date().toISOString()
    });
  }

  progress.lastReadTime = new Date().toISOString();
  await saveData(data);
};

// 获取总体进度
export const getOverallProgress = async (): Promise<{
  totalUnits: number;
  totalWords: number;
  studiedWords: number;
  wordsProgress: number;
  totalParagraphs: number;
  readParagraphs: number;
  readingProgress: number;
  completedTests: number;
  testProgress: number;
  overallProgress: number;
}> => {
  const data = await getData();

  const totalUnits = data.units.length;
  const totalWords = data.units.reduce((sum, unit) => sum + (unit.words?.length || 0), 0);

  // 计算已学习的单词数（基于测试记录）
  const studiedWordIds = new Set<string>();
  data.testResults.forEach(result => {
    const testProgress = data.testProgress.find(p => p.unitId === result.unitId);
    if (testProgress) {
      testProgress.answeredWords.forEach(w => {
        if (w.correct) studiedWordIds.add(w.wordId);
      });
    }
  });
  const studiedWords = studiedWordIds.size;

  // 计算已读段落数
  const totalParagraphs = data.units.reduce((sum, unit) => {
    if (typeof unit.article === 'object' && unit.article !== null) {
      if ('sections' in unit.article && Array.isArray(unit.article.sections)) {
        return sum + unit.article.sections.reduce((s: number, sec: any) => s + (sec.paragraphs?.length || 0), 0);
      } else if ('paragraphs' in unit.article && Array.isArray(unit.article.paragraphs)) {
        return sum + unit.article.paragraphs.length;
      }
    }
    return sum + 5; // 默认估计值
  }, 0);

  const readParagraphs = data.articleReadingProgress?.reduce((sum, p) => sum + p.readParagraphs.length, 0) || 0;

  // 计算进度百分比
  const wordsProgress = totalWords > 0 ? (studiedWords / totalWords) * 100 : 0;
  const readingProgress = totalParagraphs > 0 ? (readParagraphs / totalParagraphs) * 100 : 0;

  // 计算完成的测试数
  const completedTests = new Set(data.testResults.map(r => r.unitId)).size;
  const testProgress = totalUnits > 0 ? (completedTests / totalUnits) * 100 : 0;

  // 总体进度
  const overallProgress = (wordsProgress + readingProgress + testProgress) / 3;

  return {
    totalUnits,
    totalWords,
    studiedWords,
    wordsProgress,
    totalParagraphs,
    readParagraphs,
    readingProgress,
    completedTests,
    testProgress,
    overallProgress
  };
};

// 添加单词到错题本
export const addToWrongWords = async (word: { id: string; english: string; phonetic: string; partOfSpeech: string; chinese: string; example: string }): Promise<void> => {
  try {
    const data = await getData();

    // 检查单词是否已经在错题本中
    const existingIndex = data.wrongWords.findIndex((w: any) => w.wordId === word.id);

    if (existingIndex >= 0) {
      // 如果单词已存在，增加错误次数
      data.wrongWords[existingIndex].errorCount += 1;
    } else {
      // 如果单词不存在，添加到错题本
      data.wrongWords.push({
        wordId: word.id,
        english: word.english,
        phonetic: word.phonetic,
        partOfSpeech: word.partOfSpeech,
        chinese: word.chinese,
        example: word.example,
        addedAt: new Date().toISOString(),
        errorCount: 1
      });
    }

    await saveData(data);
  } catch (error) {
    console.error('Error adding word to wrong words:', error);
  }
};

// 从错题本中移除单词
export const removeFromWrongWords = async (wordId: string): Promise<void> => {
  try {
    const data = await getData();
    data.wrongWords = data.wrongWords.filter((w: any) => w.wordId !== wordId);
    await saveData(data);
  } catch (error) {
    console.error('Error removing word from wrong words:', error);
  }
};

// 获取错题本列表
export const getWrongWords = async (): Promise<{ wordId: string; english: string; phonetic: string; partOfSpeech: string; chinese: string; example: string; addedAt: string; errorCount: number }[]> => {
  try {
    const data = await getData();
    return data.wrongWords;
  } catch (error) {
    console.error('Error getting wrong words:', error);
    return [];
  }
};

// 检查单词是否在错题本中
export const isWordInWrongWords = async (wordId: string): Promise<boolean> => {
  try {
    const data = await getData();
    return data.wrongWords.some((w: any) => w.wordId === wordId);
  } catch (error) {
    console.error('Error checking if word is in wrong words:', error);
    return false;
  }
};

// 清空错题本
export const clearWrongWords = async (): Promise<void> => {
  try {
    const data = await getData();
    data.wrongWords = [];
    await saveData(data);
  } catch (error) {
    console.error('Error clearing wrong words:', error);
  }
};

// 保存单词的"太简单"状态
export const saveWordTooEasyStatus = async (unitId: string, wordId: string, isTooEasy: boolean): Promise<void> => {
  try {
    const data = await getData();
    const unit = data.units.find(u => u.id === unitId);
    if (unit) {
      const word = unit.words.find(w => w.id === wordId);
      if (word) {
        word.isTooEasy = isTooEasy;
        await saveData(data);
      }
    }
  } catch (error) {
    console.error('Error saving word too easy status:', error);
  }
};

// 获取自定义文章
export const getCustomArticle = async (unitId: string): Promise<{ sections: ArticleSection[] } | null> => {
  try {
    const data = await getData();
    const customArticle = data.customArticles?.find(a => a.unitId === unitId);
    return customArticle ? customArticle.content : null;
  } catch (error) {
    console.error('Error getting custom article:', error);
    return null;
  }
};

// 保存自定义文章
export const saveCustomArticle = async (unitId: string, content: { sections: ArticleSection[] }): Promise<void> => {
  try {
    const data = await getData();
    if (!data.customArticles) {
      data.customArticles = [];
    }
    const existingIndex = data.customArticles.findIndex(a => a.unitId === unitId);
    const now = new Date().toISOString();
    if (existingIndex >= 0) {
      data.customArticles[existingIndex].content = content;
      data.customArticles[existingIndex].updatedAt = now;
    } else {
      data.customArticles.push({
        unitId,
        content,
        createdAt: now,
        updatedAt: now
      });
    }
    await saveData(data);
  } catch (error) {
    console.error('Error saving custom article:', error);
  }
};

// 删除自定义文章
export const deleteCustomArticle = async (unitId: string): Promise<void> => {
  try {
    const data = await getData();
    if (data.customArticles) {
      data.customArticles = data.customArticles.filter(a => a.unitId !== unitId);
      await saveData(data);
    }
  } catch (error) {
    console.error('Error deleting custom article:', error);
  }
};

// 保存段落阅读状态
export const saveParagraphReadStatus = async (unitId: string, sectionIndex: number, paragraphIndex: number, isRead: boolean): Promise<void> => {
  try {
    const data = await getData();
    if (!data.articleReadingProgress) {
      data.articleReadingProgress = [];
    }
    let progress = data.articleReadingProgress.find(p => p.unitId === unitId);
    if (!progress) {
      progress = {
        unitId,
        readParagraphs: [],
        lastReadTime: new Date().toISOString()
      };
      data.articleReadingProgress.push(progress);
    }

    const existingIndex = progress.readParagraphs.findIndex(
      p => p.sectionIndex === sectionIndex && p.paragraphIndex === paragraphIndex
    );

    if (isRead && existingIndex < 0) {
      progress.readParagraphs.push({
        sectionIndex,
        paragraphIndex,
        isRead: true,
        readTime: new Date().toISOString()
      });
    } else if (!isRead && existingIndex >= 0) {
      progress.readParagraphs.splice(existingIndex, 1);
    }

    progress.lastReadTime = new Date().toISOString();
    await saveData(data);
  } catch (error) {
    console.error('Error saving paragraph read status:', error);
  }
};

// 检查段落是否已读
export const isParagraphRead = async (unitId: string, sectionIndex: number, paragraphIndex: number): Promise<boolean> => {
  try {
    const data = await getData();
    const progress = data.articleReadingProgress?.find(p => p.unitId === unitId);
    if (!progress) return false;
    return progress.readParagraphs.some(
      p => p.sectionIndex === sectionIndex && p.paragraphIndex === paragraphIndex && p.isRead
    );
  } catch (error) {
    console.error('Error checking paragraph read status:', error);
    return false;
  }
};

// 获取需要学习的单词（排除标记为太简单的）
export const getStudyWords = async (unitId: string): Promise<Word[]> => {
  try {
    const data = await getData();
    const unit = data.units.find(u => u.id === unitId);
    if (!unit) return [];
    return unit.words.filter(w => !w.isTooEasy);
  } catch (error) {
    console.error('Error getting study words:', error);
    return [];
  }
};
