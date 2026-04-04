import { useEffect, useState } from 'react';
import { getWrongWords, saveTestResult, addToWrongWords } from '../dataService';

interface WrongWordsTestProps {
  onSwitchUnit?: () => void;
  onBackToWrongWords?: () => void;
}

const WrongWordsTest: React.FC<WrongWordsTestProps> = ({ onSwitchUnit, onBackToWrongWords }) => {
  const [words, setWords] = useState<{ id: string; english: string; phonetic: string; partOfSpeech: string; chinese: string; example: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [remembered, setRemembered] = useState<boolean | null>(null);
  const [answeredWords, setAnsweredWords] = useState<{ wordId: string; correct: boolean }[]>([]);

  // 加载错题本数据
  useEffect(() => {
    const loadData = async () => {
      const wrongWords = await getWrongWords();
      const testWords = wrongWords.map(word => ({
        id: word.wordId,
        english: word.english,
        phonetic: word.phonetic,
        partOfSpeech: word.partOfSpeech,
        chinese: word.chinese,
        example: word.example
      }));
      setWords(testWords);
    };
    loadData();
  }, []);

  // 当currentIndex改变时生成新选项
  useEffect(() => {
    if (words.length > 0 && currentIndex < words.length) {
      generateOptions();
    }
  }, [currentIndex, words]);

  const generateOptions = () => {
    if (words.length === 0 || currentIndex >= words.length) return;
    
    const currentWord = words[currentIndex];
    const allMeanings = words.map(w => w.chinese);
    const correctMeaning = currentWord.chinese;
    
    // 获取所有其他单词的释义作为错误选项
    const wrongMeanings = allMeanings
      .filter(meaning => meaning !== correctMeaning)
      .sort(() => Math.random() - 0.5);
    
    // 确保至少有3个错误选项，如果单词不足，则重复使用其他释义
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
    setRemembered(null);
  };

  const resetTest = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setRemembered(null);
    setAnsweredWords([]);
    setSelectedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleRemember = async (value: boolean) => {
    setRemembered(value);
    if (value) {
      // 记得，显示选项
      setIsAnswered(false);
    } else {
      // 忘了，直接显示正确答案
      setIsAnswered(true);
      setIsCorrect(false);
      
      const currentWord = words[currentIndex];
      const newAnsweredWords = [...answeredWords, { wordId: currentWord.id, correct: false }];
      setAnsweredWords(newAnsweredWords);
      
      // 将单词重新加入错题本（增加错误次数）
      await addToWrongWords(currentWord);
      
      // 延迟后进入下一题或显示结果
      setTimeout(async () => {
        if (currentIndex < words.length - 1) {
          const newIndex = currentIndex + 1;
          setCurrentIndex(newIndex);
        } else {
          // 测试完成
          await saveTestResult('wrong-words', score, words.length);
          setShowResult(true);
        }
      }, 1500);
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
    } else {
      // 回答错误，将单词重新加入错题本（增加错误次数）
      await addToWrongWords(currentWord);
    }
    
    const newAnsweredWords = [...answeredWords, { wordId: currentWord.id, correct }];
    setAnsweredWords(newAnsweredWords);
    
    // 延迟后进入下一题或显示结果
    setTimeout(async () => {
      if (currentIndex < words.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
      } else {
        // 测试完成
        await saveTestResult('wrong-words', newScore, words.length);
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    resetTest();
  };

  if (words.length === 0) {
    return (
      <div className="card text-center p-8">
        <h3 className="text-xl font-bold mb-4">错题本为空</h3>
        <p className="text-gray-600 mb-6">当你在测试中回答错误或选择"忘了"时，单词会自动添加到错题本中</p>
        {onBackToWrongWords && (
          <button
            className="btn btn-primary"
            onClick={onBackToWrongWords}
          >
            返回错题本
          </button>
        )}
      </div>
    );
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
          <h2 className="text-2xl font-bold font-serif">错题本测试</h2>
        </div>
        <div className="card text-center">
          <h3 className="text-3xl font-bold mb-4">测试完成！</h3>
          <p className="text-xl mb-2">你的得分：{finalScore} / {words.length}</p>
          <p className="text-gray-600 mb-6">正确率：{(finalScore / words.length * 100).toFixed(0)}%</p>
          <div className="space-y-4">
            <button 
              className="btn btn-primary"
              onClick={handleRestart}
            >
              重新测试
            </button>
            {onBackToWrongWords && (
              <button 
                className="btn btn-secondary"
                onClick={onBackToWrongWords}
              >
                返回错题本
              </button>
            )}
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
        {onBackToWrongWords && (
          <button 
            className="btn btn-secondary"
            onClick={onBackToWrongWords}
          >
            返回错题本
          </button>
        )}
        <h2 className="text-2xl font-bold font-serif">错题本测试</h2>
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
        
        {!isAnswered && remembered === null ? (
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
        ) : !isAnswered && remembered === true ? (
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
            <p className="text-red-500 mb-2">{remembered === false ? '你选择了"忘了"' : '回答错误'}</p>
            <p className="text-gray-800">正确答案：<span className="font-semibold">{currentWord.chinese}</span></p>
          </div>
        ) : isAnswered && isCorrect ? (
          <div className="mt-4">
            <p className="text-green-500 mb-2">回答正确！</p>
            <p className="text-gray-800">释义：<span className="font-semibold">{currentWord.chinese}</span></p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WrongWordsTest;