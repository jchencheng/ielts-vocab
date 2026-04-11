import { useEffect, useState } from 'react';
import { getData, saveTestResult, saveTestProgress, getTestProgress, clearTestProgress, getStudyWords, addToWrongWords, getWrongWords, removeFromWrongWords } from '../dataService';
import { Word, TestProgress } from '../types';

interface TestProps {
  unitId: string;
  onSwitchUnit?: () => void;
  onTestComplete?: () => void;
}

const Test: React.FC<TestProps> = ({ unitId, onSwitchUnit, onTestComplete }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [unitName, setUnitName] = useState('');
  const [showMeaningOptions, setShowMeaningOptions] = useState(false);
  const [remembered, setRemembered] = useState<boolean | null>(null);
  const [answeredWords, setAnsweredWords] = useState<{ wordId: string; correct: boolean }[]>([]);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  // 加载单元数据（排除太简单的单词）
  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      const unit = data.units.find(u => u.id === unitId);
      if (unit) {
        // 获取需要学习的单词（排除标记为太简单的）
        const studyWords = await getStudyWords(unitId);
        setWords(studyWords);
        setUnitName(unit.name);
      }
    };
    loadData();
  }, [unitId]);

  // 加载保存的进度或开始新测试
  useEffect(() => {
    const loadProgress = async () => {
      if (words.length > 0) {
        const savedProgress = await getTestProgress(unitId);
        if (savedProgress && savedProgress.currentIndex < words.length) {
          // 恢复进度
          setCurrentIndex(savedProgress.currentIndex);
          setScore(savedProgress.score);
          setAnsweredWords(savedProgress.answeredWords);
          setHasSavedProgress(true);
        } else {
          // 开始新测试
          await resetTest();
        }
      }
    };
    loadProgress();
  }, [words, unitId]);

  // 当currentIndex改变时生成新选项
  useEffect(() => {
    if (words.length > 0 && currentIndex < words.length) {
      generateOptions();
    }
  }, [currentIndex, words]);

  const resetTest = async () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setShowMeaningOptions(false);
    setRemembered(null);
    setAnsweredWords([]);
    setHasSavedProgress(false);
    setSelectedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    await clearTestProgress(unitId);
  };

  const generateOptions = () => {
    if (words.length === 0 || currentIndex >= words.length) return;
    
    const currentWord = words[currentIndex];
    const allMeanings = words.map(w => w.chinese);
    const correctMeaning = currentWord.chinese;
    
    // 获取所有其他单词的释义作为错误选项
    const wrongMeanings = allMeanings
      .filter(meaning => meaning !== correctMeaning)
      .sort(() => Math.random() - 0.5);
    
    // 确保至少有3个错误选项，如果单元单词不足，则重复使用该单元的其他释义
    let selectedWrongMeanings = wrongMeanings.slice(0, 3);
    while (selectedWrongMeanings.length < 3 && wrongMeanings.length > 0) {
      selectedWrongMeanings.push(wrongMeanings[selectedWrongMeanings.length % wrongMeanings.length]);
    }
    
    // 混合选项（1个正确答案 + 3个错误答案）
    const mixedOptions = [...selectedWrongMeanings, correctMeaning]
      .sort(() => Math.random() - 0.5);
    
    setOptions(mixedOptions);
    setSelectedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setShowMeaningOptions(false);
    setRemembered(null);
  };

  const saveProgress = async (newIndex: number, newScore: number, newAnsweredWords: { wordId: string; correct: boolean }[]) => {
    const progress: TestProgress = {
      unitId,
      currentIndex: newIndex,
      score: newScore,
      answeredWords: newAnsweredWords,
      lastUpdated: new Date().toISOString()
    };
    await saveTestProgress(progress);
  };

  const handleRemember = async (value: boolean) => {
    setRemembered(value);
    if (value) {
      // 记得，显示选项
      setShowMeaningOptions(true);
    } else {
      // 忘了，直接显示正确答案
      setIsAnswered(true);
      setIsCorrect(false);
      
      const currentWord = words[currentIndex];
      const newAnsweredWords = [...answeredWords, { wordId: currentWord.id, correct: false }];
      setAnsweredWords(newAnsweredWords);
      
      // 将单词加入错题本
      await addToWrongWords(currentWord);
      
      // 延迟后进入下一题或显示结果
      setTimeout(async () => {
        if (currentIndex < words.length - 1) {
          const newIndex = currentIndex + 1;
          setCurrentIndex(newIndex);
          await saveProgress(newIndex, score, newAnsweredWords);
        } else {
          // 测试完成
          await saveTestResult(unitId, score, words.length);
          await clearTestProgress(unitId);
          setShowResult(true);
          if (onTestComplete) {
            onTestComplete();
          }
        }
      }, 500);
    }
  };

  const handleAnswer = async (option: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setIsAnswered(true);
    
    const currentWord = words[currentIndex];
    const correct = option === currentWord.chinese;
    setIsCorrect(correct);
    
    const newScore = correct ? score + 1 : score;
    if (correct) {
      setScore(newScore);
      // 回答正确，将单词从错题本中移除
      await removeFromWrongWords(currentWord.id);
    } else {
      // 回答错误，将单词加入错题本
      await addToWrongWords(currentWord);
    }
    
    const newAnsweredWords = [...answeredWords, { wordId: currentWord.id, correct }];
    setAnsweredWords(newAnsweredWords);
    
    // 延迟后进入下一题或显示结果
    setTimeout(async () => {
      if (currentIndex < words.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        await saveProgress(newIndex, newScore, newAnsweredWords);
      } else {
        // 测试完成
        await saveTestResult(unitId, newScore, words.length);
        await clearTestProgress(unitId);
        setShowResult(true);
        if (onTestComplete) {
          onTestComplete();
        }
      }
    }, 500);
  };

  const handleRestart = async () => {
    await resetTest();
  };

  const handleRetryWrongWords = async () => {
    // 获取当前单元的错题
    const allWrongWords = await getWrongWords();
    const unitWrongWords = allWrongWords.filter(word => {
      // 从wordId中提取单元信息，假设wordId格式为word-{unitNumber}-{wordNumber}
      const unitIdMatch = word.wordId.match(/word-(\d+)-\d+/);
      if (unitIdMatch) {
        const unitNumber = parseInt(unitIdMatch[1]);
        return unitId === `unit-${unitNumber}`;
      }
      return false;
    });

    if (unitWrongWords.length > 0) {
      // 转换错题格式为Word格式
      const wrongWordsAsWord: Word[] = unitWrongWords.map(wrongWord => ({
        id: wrongWord.wordId,
        english: wrongWord.english,
        phonetic: wrongWord.phonetic,
        partOfSpeech: wrongWord.partOfSpeech,
        chinese: wrongWord.chinese,
        example: wrongWord.example
      }));

      // 设置为错题测试模式
      setWords(wrongWordsAsWord);
      await resetTest();
    } else {
      alert('此单元没有错题！');
    }
  };

  const handleContinue = () => {
    setHasSavedProgress(false);
  };

  if (words.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="empty-state">
          <div className="loading-spinner" style={{ marginBottom: 'var(--space-4)' }} />
          <p className="empty-state-description">加载中...</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    const finalScore = score + (isCorrect ? 1 : 0);
    const percentage = Math.round((finalScore / words.length) * 100);
    return (
      <div className="animate-fade-in">
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

        <div className="test-container">
          <div className="card test-result">
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🎉</div>
            <h2 className="test-score">{finalScore} <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/ {words.length}</span></h2>
            <p className="test-score-label">正确率 {percentage}%</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <button 
                className="btn btn-primary btn-lg btn-full"
                onClick={handleRestart}
              >
                🔄 重新测试
              </button>
              <button 
                className="btn btn-secondary btn-full"
                onClick={handleRetryWrongWords}
              >
                📝 重做此单元错题
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 显示继续测试的提示
  if (hasSavedProgress) {
    return (
      <div className="animate-fade-in">
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

        <div className="test-container">
          <div className="card test-result">
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>⏸️</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>继续测试？</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              你有一个未完成的测试
            </p>
            
            <div style={{ 
              background: 'var(--bg-tertiary)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-6)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span>进度</span>
                <span style={{ fontWeight: 600 }}>{currentIndex + 1} / {words.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>当前得分</span>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{score} 分</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <button 
                className="btn btn-primary btn-lg btn-full"
                onClick={handleContinue}
              >
                ▶️ 继续测试
              </button>
              <button 
                className="btn btn-secondary btn-full"
                onClick={handleRestart}
              >
                🔄 重新开始
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];
  const progress = (currentIndex + 1) / words.length * 100;

  return (
    <div className="animate-fade-in">
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

      <div className="test-container">
        {/* Progress */}
        <div className="card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <div className="flex justify-between" style={{ marginBottom: 'var(--space-2)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span>问题 {currentIndex + 1} / {words.length}</span>
            <span>得分: {score}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="card test-card">
          <div className="test-word">{currentWord.english}</div>
          <div className="test-phonetic">{currentWord.phonetic}</div>
          
          {!showMeaningOptions && remembered === null ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <button
                className="btn btn-success btn-lg btn-full"
                onClick={() => handleRemember(true)}
              >
                ✓ 记得
              </button>
              <button
                className="btn btn-secondary btn-lg btn-full"
                onClick={() => handleRemember(false)}
              >
                ✗ 忘了
              </button>
            </div>
          ) : showMeaningOptions ? (
            <div className="test-options">
              {options.map((option, index) => (
                <button
                  key={index}
                  className={`btn test-option ${selectedAnswer === option ? (isCorrect ? 'btn-success' : 'btn-danger') : 'btn-secondary'}`}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : isAnswered && !isCorrect ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
              <p style={{ color: 'var(--color-error)', marginBottom: 'var(--space-2)' }}>你选择了"忘了"</p>
              <p style={{ color: 'var(--text-secondary)' }}>
                正确答案：<span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{currentWord.chinese}</span>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Test;
