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
        <h1 className="page-title">错题本</h1>
      </div>

      {/* Stats Card */}
      <div className="card mb-6">
        <div className="card-header" style={{ justifyContent: 'space-between' }}>
          <div className="flex items-center gap-3">
            <span className="card-icon">📚</span>
            <h3 className="card-title">错题统计</h3>
          </div>
          {wrongWords.length > 0 && (
            <button
              className="btn btn-danger btn-sm"
              onClick={handleClearAll}
            >
              🗑️ 清空错题本
            </button>
          )}
        </div>
        <div className="card-body">
          <div className="stats-grid" style={{ marginBottom: 0 }}>
            <div className="stat-card" style={{ padding: 'var(--space-4)', boxShadow: 'none', border: '1px solid var(--border-light)' }}>
              <span className="stat-value" style={{ color: 'var(--color-error)' }}>{wrongWords.length}</span>
              <span className="stat-label">错题总数</span>
            </div>
            <div className="stat-card" style={{ padding: 'var(--space-4)', boxShadow: 'none', border: '1px solid var(--border-light)' }}>
              <span className="stat-value">{wrongWords.reduce((sum, w) => sum + w.errorCount, 0)}</span>
              <span className="stat-label">总错误次数</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wrong Words List */}
      {wrongWords.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h4 className="empty-state-title">错题本为空</h4>
            <p className="empty-state-description">
              当你在测试中回答错误或选择"忘了"时，单词会自动添加到错题本中
            </p>
            {onStartTest && (
              <button
                className="btn btn-primary mt-6"
                onClick={onStartTest}
              >
                📝 开始测试
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="word-list-header" style={{ gridTemplateColumns: '1fr 2fr 100px 100px' }}>
            <div>单词</div>
            <div>释义</div>
            <div style={{ textAlign: 'center' }}>错误次数</div>
            <div style={{ textAlign: 'right' }}>操作</div>
          </div>
          {wrongWords.map((word) => (
            <div 
              key={word.wordId} 
              className="word-list-item"
              style={{ gridTemplateColumns: '1fr 2fr 100px 100px' }}
            >
              <div>
                <div className="word-english">{word.english}</div>
                {word.phonetic && (
                  <div className="word-phonetic">{word.phonetic}</div>
                )}
              </div>
              <div className="word-chinese">
                {word.chinese}
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '28px',
                  height: '28px',
                  padding: '0 var(--space-2)',
                  background: 'var(--color-error)',
                  color: 'white',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}>
                  {word.errorCount}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveWord(word.wordId)}
                  title="从错题本移除"
                >
                  移除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Start Test Button */}
      {wrongWords.length > 0 && onStartTest && (
        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
          <button
            className="btn btn-primary btn-lg"
            onClick={onStartTest}
          >
            📝 开始错题测试
          </button>
        </div>
      )}
    </div>
  );
};

export default WrongWords;
