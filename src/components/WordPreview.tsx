import { useEffect, useState } from 'react';
import { getData, saveWordTooEasyStatus, addToWrongWords, removeFromWrongWords, getWrongWords } from '../dataService';
import { Word } from '../types';

interface WordPreviewProps {
  unitId: string;
  onSwitchUnit?: () => void;
}

const WordPreview: React.FC<WordPreviewProps> = ({ unitId, onSwitchUnit }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [unitName, setUnitName] = useState('');
  const [easyWordIds, setEasyWordIds] = useState<Set<string>>(new Set());
  const [wrongWordIds, setWrongWordIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      const unit = data.units.find(u => u.id === unitId);
      if (unit) {
        setWords(unit.words);
        setUnitName(unit.name);
        // 加载已标记为太简单的单词
        const easyIds = new Set(unit.words.filter(w => w.isTooEasy).map(w => w.id));
        setEasyWordIds(easyIds);
        // 加载错题本中的单词
        const wrongWords = await getWrongWords();
        const wrongWordIdsSet = new Set(wrongWords.map(w => w.wordId));
        const unitWrongIds = new Set(unit.words.filter(w => wrongWordIdsSet.has(w.id)).map(w => w.id));
        setWrongWordIds(unitWrongIds);
      }
    };
    loadData();
  }, [unitId]);

  const handleToggleTooEasy = async (wordId: string) => {
    const newEasyWordIds = new Set(easyWordIds);
    const isCurrentlyEasy = easyWordIds.has(wordId);
    
    if (isCurrentlyEasy) {
      newEasyWordIds.delete(wordId);
    } else {
      newEasyWordIds.add(wordId);
    }
    
    setEasyWordIds(newEasyWordIds);
    
    // 保存到数据存储
    await saveWordTooEasyStatus(unitId, wordId, !isCurrentlyEasy);
    
    // 更新本地words状态
    setWords(prevWords => 
      prevWords.map(word => 
        word.id === wordId 
          ? { ...word, isTooEasy: !isCurrentlyEasy }
          : word
      )
    );
  };

  const handleToggleWrongWord = (word: Word) => {
    const newWrongWordIds = new Set(wrongWordIds);
    const isCurrentlyWrong = wrongWordIds.has(word.id);
    
    if (isCurrentlyWrong) {
      newWrongWordIds.delete(word.id);
      // 从错题本中移除
      removeFromWrongWords(word.id);
    } else {
      newWrongWordIds.add(word.id);
      // 添加到错题本
      addToWrongWords(word);
    }
    
    setWrongWordIds(newWrongWordIds);
  };

  const easyWordsCount = easyWordIds.size;
  const totalWords = words.length;
  const studyWordsCount = totalWords - easyWordsCount;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        {onSwitchUnit && (
          <button 
            className="btn btn-secondary"
            onClick={onSwitchUnit}
          >
            ← 返回
          </button>
        )}
        <h1 className="page-title">{unitName}</h1>
      </div>

      {/* Stats Card */}
      <div className="card mb-6">
        <div className="card-header">
          <span className="card-icon">📊</span>
          <h3 className="card-title">学习统计</h3>
        </div>
        <div className="card-body">
          <div className="stats-grid" style={{ marginBottom: 0 }}>
            <div className="stat-card" style={{ padding: 'var(--space-4)', boxShadow: 'none', border: '1px solid var(--border-light)' }}>
              <span className="stat-value">{totalWords}</span>
              <span className="stat-label">总单词数</span>
            </div>
            <div className="stat-card" style={{ padding: 'var(--space-4)', boxShadow: 'none', border: '1px solid var(--border-light)' }}>
              <span className="stat-value" style={{ color: 'var(--color-success)' }}>{studyWordsCount}</span>
              <span className="stat-label">需学习</span>
            </div>
            <div className="stat-card" style={{ padding: 'var(--space-4)', boxShadow: 'none', border: '1px solid var(--border-light)' }}>
              <span className="stat-value" style={{ color: 'var(--color-warning)' }}>{easyWordsCount}</span>
              <span className="stat-label">已标记简单</span>
            </div>
          </div>
        </div>
      </div>

      {/* Word List */}
      <div className="card">
        <div className="word-list-header">
          <div>单词</div>
          <div>释义</div>
          <div style={{ textAlign: 'right' }}>操作</div>
        </div>
        {words.map((word) => {
          const isTooEasy = easyWordIds.has(word.id);
          const isWrongWord = wrongWordIds.has(word.id);
          return (
            <div 
              key={word.id} 
              className="word-list-item"
              style={{ 
                opacity: isTooEasy ? 0.6 : 1,
              }}
            >
              <div>
                <div className="word-english" style={{ textDecoration: isTooEasy ? 'line-through' : 'none' }}>
                  {word.english}
                </div>
                {word.phonetic && (
                  <div className="word-phonetic">{word.phonetic}</div>
                )}
              </div>
              <div className="word-chinese">
                {word.chinese}
              </div>
              <div className="word-actions">
                <button
                  className={`btn btn-sm ${isTooEasy ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => handleToggleTooEasy(word.id)}
                  title={isTooEasy ? '取消标记' : '标记为太简单'}
                >
                  {isTooEasy ? '取消' : '太简单'}
                </button>
                <button
                  className={`btn btn-sm ${isWrongWord ? 'btn-danger' : 'btn-secondary'}`}
                  onClick={() => handleToggleWrongWord(word)}
                  title={isWrongWord ? '从错题本移除' : '加入错题本'}
                >
                  {isWrongWord ? '移除' : '错题'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordPreview;
