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
    const data = getData();
    const unit = data.units.find(u => u.id === unitId);
    if (unit) {
      // 获取需要学习的单词（排除标记为太简单的）
      const studyWords = getStudyWords(unitId);
      setWords(studyWords);
      setUnitName(unit.name);
    }
  }, [unitId]);

  // 加载保存的进度或开始新测试
  useEffect(() => {
    if (words.length > 0) {
      const savedProgress = getTestProgress(unitId);
      if (savedProgress && savedProgress.currentIndex < words.length) {
        // 恢复进度
        setCurrentIndex(savedProgress.currentIndex);
        setScore(savedProgress.score);
        setAnsweredWords(savedProgress.answeredWords);
        setHasSavedProgress(true);
      } else {
        // 开始新测试
        resetTest();
      }
    }
  }, [words, unitId]);

  // 当currentIndex改变时生成新选项
  useEffect(() => {
    if (words.length > 0 && currentIndex < words.length) {
      generateOptions();
    }
  }, [currentIndex, words]);

  const resetTest = () => {
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
    clearTestProgress(unitId);
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

  const saveProgress = (newIndex: number, newScore: number, newAnsweredWords: { wordId: string; correct: boolean }[]) => {
    const progress: TestProgress = {
      unitId,
      currentIndex: newIndex,
      score: newScore,
      answeredWords: newAnsweredWords,
      lastUpdated: new Date().toISOString()
    };
    saveTestProgress(progress);
  };

  const handleRemember = (value: boolean) => {
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
      addToWrongWords(currentWord);
      
      // 延迟后进入下一题或显示结果
      setTimeout(() => {
        if (currentIndex < words.length - 1) {
          const newIndex = currentIndex + 1;
          setCurrentIndex(newIndex);
          saveProgress(newIndex, score, newAnsweredWords);
        } else {
          // 测试完成
          saveTestResult(unitId, score, words.length);
          clearTestProgress(unitId);
          setShowResult(true);
          if (onTestComplete) {
            onTestComplete();
          }
        }
      }, 1500);
    }
  };

  const handleAnswer = (option: string) => {
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
      removeFromWrongWords(currentWord.id);
    } else {
      // 回答错误，将单词加入错题本
      addToWrongWords(currentWord);
    }
    
    const newAnsweredWords = [...answeredWords, { wordId: currentWord.id, correct }];
    setAnsweredWords(newAnsweredWords);
    
    // 延迟后进入下一题或显示结果
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        saveProgress(newIndex, newScore, newAnsweredWords);
      } else {
        // 测试完成
        saveTestResult(unitId, newScore, words.length);
        clearTestProgress(unitId);
        setShowResult(true);
        if (onTestComplete) {
          onTestComplete();
        }
      }
    }, 1500);
  };

  const handleRestart = () => {
    resetTest();
  };

  const handleRetryWrongWords = () => {
    // 获取当前单元的错题
    const allWrongWords = getWrongWords();
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
      resetTest();
    } else {
      alert('此单元没有错题！');
    }
  };

  const handleContinue = () => {
    setHasSavedProgress(false);
  };

  if (words.length === 0) {
    return <div>Loading...</div>;
  }

  if (showResult) {
    const finalScore = score + (isCorrect ? 1 : 0);
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          {onSwitchUnit && (
            <button 
              className="btn btn-secondary"
              onClick={onSwitchUnit}
            >
              返回
            </button>
          )}
          <h2 className="text-2xl font-bold font-serif">{unitName}</h2>
        </div>
        <div className="card text-center">
          <h3 className="text-3xl font-bold mb-4">测试完成！</h3>
          <p className="text-xl mb-2">你的得分：{finalScore} / {words.length}</p>
          <p className="text-gray-600 mb-6">正确率：{(finalScore / words.length * 100).toFixed(0)}%</p>
          <div className="space-y-4">
            <button 
              className="btn btn-primary w-full"
              onClick={handleRestart}
            >
              重新测试
            </button>
            <button 
              className="btn btn-secondary w-full"
              onClick={handleRetryWrongWords}
            >
              重做此单元错题
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 显示继续测试的提示
  if (hasSavedProgress) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          {onSwitchUnit && (
            <button 
              className="btn btn-secondary"
              onClick={onSwitchUnit}
            >
              返回
            </button>
          )}
          <h2 className="text-2xl font-bold font-serif">{unitName}</h2>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold mb-4">继续测试？</h3>
          <p className="text-gray-600 mb-2">你有一个未完成的测试</p>
          <p className="text-lg mb-6">
            进度：{currentIndex + 1} / {words.length} 题
            <br />
            当前得分：{score} 分
          </p>
          <div className="space-y-4">
            <button 
              className="btn btn-primary w-full"
              onClick={handleContinue}
            >
              继续测试
            </button>
            <button 
              className="btn btn-secondary w-full"
              onClick={handleRestart}
            >
              重新开始
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];
  const progress = (currentIndex + 1) / words.length * 100;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        {onSwitchUnit && (
          <button 
            className="btn btn-secondary"
            onClick={onSwitchUnit}
          >
            切换单元
          </button>
        )}
        <h2 className="text-2xl font-bold font-serif">{unitName}</h2>
      </div>
      
      {/* 进度条 */}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gray-600">问题 {currentIndex + 1} / {words.length}</p>

      <div className="card">
        <h3 className="text-2xl font-semibold mb-2">{currentWord.english}</h3>
        <p className="text-gray-500 mb-6">{currentWord.phonetic}</p>
        
        {!showMeaningOptions && remembered === null ? (
          <div className="space-y-4">
            <button
              className="btn btn-success w-full"
              onClick={() => handleRemember(true)}
            >
              记得
            </button>
            <button
              className="btn btn-danger w-full"
              onClick={() => handleRemember(false)}
            >
              忘了
            </button>
          </div>
        ) : showMeaningOptions ? (
          <div className="space-y-4">
            {options.map((option, index) => (
              <button
                key={index}
                className={`btn w-full text-left ${selectedAnswer === option ? (isCorrect ? 'btn-success' : 'btn-danger') : 'btn-secondary'}`}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>
        ) : isAnswered && !isCorrect ? (
          <div className="mt-4">
            <p className="text-red-500 mb-2">你选择了"忘了"</p>
            <p className="text-gray-800">正确答案：<span className="font-semibold">{currentWord.chinese}</span></p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Test;
