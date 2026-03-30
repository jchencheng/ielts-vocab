import { useEffect, useState } from 'react';
import { getData, saveWordTooEasyStatus, addToWrongWords, removeFromWrongWords, isWordInWrongWords } from '../dataService';
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
    const data = getData();
    const unit = data.units.find(u => u.id === unitId);
    if (unit) {
      setWords(unit.words);
      setUnitName(unit.name);
      // 加载已标记为太简单的单词
      const easyIds = new Set(unit.words.filter(w => w.isTooEasy).map(w => w.id));
      setEasyWordIds(easyIds);
      // 加载错题本中的单词
      const wrongIds = new Set(unit.words.filter(w => isWordInWrongWords(w.id)).map(w => w.id));
      setWrongWordIds(wrongIds);
    }
  }, [unitId]);

  const handleToggleTooEasy = (wordId: string) => {
    const newEasyWordIds = new Set(easyWordIds);
    const isCurrentlyEasy = easyWordIds.has(wordId);
    
    if (isCurrentlyEasy) {
      newEasyWordIds.delete(wordId);
    } else {
      newEasyWordIds.add(wordId);
    }
    
    setEasyWordIds(newEasyWordIds);
    
    // 保存到数据存储
    saveWordTooEasyStatus(unitId, wordId, !isCurrentlyEasy);
    
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
    <div>
      <div className="flex items-center gap-4 mb-6">
        {onSwitchUnit && (
          <button 
            className="btn btn-secondary"
            onClick={onSwitchUnit}
          >
            切换单元
          </button>
        )}
        <h2 className="text-2xl font-bold">{unitName}</h2>
      </div>
      
      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg">
              本单元共 <span className="font-bold text-blue-400">{totalWords}</span> 个单词
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              需学习: <span className="font-bold text-green-400">{studyWordsCount}</span> | 
              已标记太简单: <span className="font-bold text-yellow-400">{easyWordsCount}</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="word-list">
        <div className="word-item" style={{ backgroundColor: 'var(--bg-tertiary)', fontWeight: 'bold' }}>
          <div style={{ width: '30%' }}>单词</div>
          <div style={{ width: '50%' }}>释义</div>
          <div style={{ width: '20%', textAlign: 'center' }}>操作</div>
        </div>
        {words.map((word) => {
          const isTooEasy = easyWordIds.has(word.id);
          const isWrongWord = wrongWordIds.has(word.id);
          return (
            <div 
              key={word.id} 
              className="word-item"
              style={{ 
                opacity: isTooEasy ? 0.6 : 1,
                backgroundColor: isTooEasy ? 'var(--bg-secondary)' : 'transparent'
              }}
            >
              <div style={{ width: '30%' }}>
                <div className="word-english" style={{ textDecoration: isTooEasy ? 'line-through' : 'none' }}>
                  {word.english}
                </div>
                {word.phonetic && (
                  <div className="word-phonetic">{word.phonetic}</div>
                )}
              </div>
              <div className="word-chinese" style={{ width: '50%' }}>
                {word.chinese}
              </div>
              <div style={{ width: '20%', textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  className={`btn btn-sm ${isTooEasy ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => handleToggleTooEasy(word.id)}
                  style={{ 
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isTooEasy ? '取消标记' : '太简单'}
                </button>
                <button
                  className={`btn btn-sm ${isWrongWord ? 'btn-danger' : 'btn-warning'}`}
                  onClick={() => handleToggleWrongWord(word)}
                  style={{ 
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isWrongWord ? '移出错题' : '加入错题'}
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
