export interface Word {
  id: string;
  english: string;
  phonetic: string;
  partOfSpeech: string;
  chinese: string;
  example: string;
  isTooEasy?: boolean;  // 标记为太简单，不在测试中出现
}

export interface ArticleParagraph {
  english: string;
  chinese: string;
}

export interface ArticleSection {
  title: string;
  subtitle: string;
  paragraphs: ArticleParagraph[];
}

export interface Article {
  english: string;
  chinese: string;
  paragraphs?: ArticleParagraph[];
  sections?: ArticleSection[];
}

export interface Unit {
  id: string;
  name: string;
  words: Word[];
  article: Article | string | { paragraphs: ArticleParagraph[] } | { sections: ArticleSection[] };
}

export interface TestResult {
  unitId: string;
  score: number;
  total: number;
  date: string;
}

export interface TestProgress {
  unitId: string;
  currentIndex: number;
  score: number;
  answeredWords: { wordId: string; correct: boolean }[];
  lastUpdated: string;
}

export interface LearningProgress {
  unitId: string;
  unitName: string;
  activeTab: string;
  lastLearningTime: string;
  sectionIndex?: number;  // 当前阅读的篇章索引
  paragraphIndex?: number; // 当前阅读的段落索引
}

export interface ParagraphProgress {
  sectionIndex: number;
  paragraphIndex: number;
  isRead: boolean;
  readTime?: string;
}

export interface ArticleReadingProgress {
  unitId: string;
  readParagraphs: ParagraphProgress[];  // 已读的段落列表
  lastReadTime: string;
}

export interface WrongWord {
  wordId: string;
  english: string;
  phonetic: string;
  partOfSpeech: string;
  chinese: string;
  example: string;
  addedAt: string;
  errorCount: number;
}

export interface UserData {
  units: Unit[];
  testResults: TestResult[];
  testProgress: TestProgress[];
  currentUnitId: string;
  lastLearningProgress?: LearningProgress;  // 上次学习进度
  articleReadingProgress?: ArticleReadingProgress[];  // 文章阅读进度
  wrongWords: WrongWord[];  // 错题本
}