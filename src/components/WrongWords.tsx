import { useEffect, useState } from 'react';
import { getWrongWords, removeFromWrongWords, clearWrongWords } from '../dataService';
import { WrongWord } from '../types';

interface WrongWordsProps {
  onSwitchUnit?: () => void;
  onStartTest?: () => void;
}

const WrongWords: React.FC<WrongWordsProps> = ({ onSwitchUnit, onStartTest }) => {
  const [wrongWords, setWrongWords] = useState<WrongWord[]>([]);

  useEffect(() => {
    loadWrongWords();
  }, []);

  const loadWrongWords = async () => {
    const words = await getWrongWords();
    setWrongWords(words);
  };

  const handleRemoveWord = async (wordId: string) => {
    await removeFromWrongWords(wordId);
    await loadWrongWords();
  };

  const handleClearAll = async () => {
    if (window.confirm('确定要清空错题本吗？')) {
      await clearWrongWords();
      await loadWrongWords();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        {onSwitchUnit && (
          <button 
            className="btn btn-secondary"
            onClick={onSwitchUnit}
          >
            返回
          </button>
        )}
        <h2 className="text-2xl font-bold">错题本</h2>
      </div>

      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg">
              错题本共 <span className="font-bold text-red-400">{wrongWords.length}</span> 个单词
            </p>
          </div>
          {wrongWords.length > 0 && (
            <button
              className="btn btn-danger"
              onClick={handleClearAll}
            >
              清空错题本
            </button>
          )}
        </div>
      </div>

      {wrongWords.length === 0 ? (
        <div className="card text-center p-8">
          <h3 className="text-xl font-bold mb-4">错题本为空</h3>
          <p className="text-gray-600">当你在测试中回答错误或选择"忘了"时，单词会自动添加到错题本中</p>
          {onStartTest && (
            <button
              className="btn btn-primary mt-6"
              onClick={onStartTest}
            >
              开始测试
            </button>
          )}
        </div>
      ) : (
        <div className="word-list">
          <div className="word-item" style={{ backgroundColor: 'var(--bg-tertiary)', fontWeight: 'bold' }}>
            <div style={{ width: '25%' }}>单词</div>
            <div style={{ width: '40%' }}>释义</div>
            <div style={{ width: '15%', textAlign: 'center' }}>错误次数</div>
            <div style={{ width: '20%', textAlign: 'center' }}>操作</div>
          </div>
          {wrongWords.map((word) => (
            <div 
              key={word.wordId} 
              className="word-item"
            >
              <div style={{ width: '25%' }}>
                <div className="word-english">{word.english}</div>
                {word.phonetic && (
                  <div className="word-phonetic">{word.phonetic}</div>
                )}
              </div>
              <div className="word-chinese" style={{ width: '40%' }}>
                {word.chinese}
              </div>
              <div style={{ width: '15%', textAlign: 'center' }}>
                <span className="text-red-500 font-bold">{word.errorCount}</span>
              </div>
              <div style={{ width: '20%', textAlign: 'center' }}>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveWord(word.wordId)}
                  style={{ 
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem'
                  }}
                >
                  移出错题本
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WrongWords;