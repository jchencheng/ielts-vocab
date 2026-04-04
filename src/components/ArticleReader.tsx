import { useEffect, useState } from 'react';
import { getData, saveParagraphReadStatus, isParagraphRead, getCustomArticle } from '../dataService';
import { Word, ArticleSection } from '../types';

interface ArticleReaderProps {
  unitId: string;
  onSwitchUnit?: () => void;
}

const ArticleReader: React.FC<ArticleReaderProps> = ({ unitId, onSwitchUnit }) => {
  const [sections, setSections] = useState<ArticleSection[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [unitName, setUnitName] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    word: Word | null;
    x: number;
    y: number;
  }>({ visible: false, word: null, x: 0, y: 0 });
  const [readParagraphs, setReadParagraphs] = useState<Set<string>>(new Set());
  const [totalParagraphs, setTotalParagraphs] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      const unit = data.units.find(u => u.id === unitId);
      if (unit) {
        // 首先检查是否有自定义文章
        const customArticle = await getCustomArticle(unitId);
        if (customArticle) {
          // 使用自定义文章
          setSections(customArticle.sections);
          const total = customArticle.sections.reduce((sum, s) => sum + s.paragraphs.length, 0);
          setTotalParagraphs(total);
        } else {
          // 使用默认文章
          // 处理article可能是字符串、Article对象或带sections的新格式
          if (typeof unit.article === 'string') {
            setSections([{ title: '学术文章', subtitle: '', paragraphs: [{ english: unit.article, chinese: '' }] }]);
            setTotalParagraphs(1);
          } else if ('sections' in unit.article && Array.isArray((unit.article as any).sections)) {
            const secs = (unit.article as any).sections as ArticleSection[];
            setSections(secs);
            const total = secs.reduce((sum, s) => sum + s.paragraphs.length, 0);
            setTotalParagraphs(total);
          } else if ('paragraphs' in unit.article && Array.isArray((unit.article as any).paragraphs)) {
            const paras = (unit.article as any).paragraphs;
            setSections([{ title: '学术文章', subtitle: '', paragraphs: paras }]);
            setTotalParagraphs(paras.length);
          } else {
            const art = unit.article as { english: string; chinese: string };
            setSections([{ title: '学术文章', subtitle: '', paragraphs: [{ english: art.english, chinese: art.chinese }] }]);
            setTotalParagraphs(1);
          }
        }
        setWords(unit.words);
        setUnitName(unit.name);
        
        // 加载已读段落
        await loadReadParagraphs();
      }
    };
    loadData();
  }, [unitId]);

  const loadReadParagraphs = async () => {
    const readSet = new Set<string>();
    for (let secIdx = 0; secIdx < sections.length; secIdx++) {
      const section = sections[secIdx];
      for (let paraIdx = 0; paraIdx < section.paragraphs.length; paraIdx++) {
        const isRead = await isParagraphRead(unitId, secIdx, paraIdx);
        if (isRead) {
          readSet.add(`${secIdx}-${paraIdx}`);
        }
      }
    }
    setReadParagraphs(readSet);
  };

  // 当sections加载完成后，重新加载已读状态
  useEffect(() => {
    const load = async () => {
      if (sections.length > 0) {
        await loadReadParagraphs();
      }
    };
    load();
  }, [sections, unitId]);

  const handleToggleRead = async (sectionIndex: number, paragraphIndex: number) => {
    const key = `${sectionIndex}-${paragraphIndex}`;
    const isCurrentlyRead = readParagraphs.has(key);
    
    // 保存到数据存储
    await saveParagraphReadStatus(unitId, sectionIndex, paragraphIndex, !isCurrentlyRead);
    
    // 更新本地状态
    const newReadParagraphs = new Set(readParagraphs);
    if (isCurrentlyRead) {
      newReadParagraphs.delete(key);
    } else {
      newReadParagraphs.add(key);
    }
    setReadParagraphs(newReadParagraphs);
  };

  const highlightWords = (text: string) => {
    let result = text;
    // 处理换行符，将其替换为<br>标签
    result = result.replace(/\n/g, '<br>');
    words.forEach(word => {
      const regex = new RegExp(`\b${word.english}\b`, 'gi');
      result = result.replace(regex, (match) => {
        return `<span class="highlight" data-word-id="${word.id}">${match}</span>`;
      });
    });
    return result;
  };

  const handleWordHover = (wordId: string, event: React.MouseEvent) => {
    const word = words.find(w => w.id === wordId);
    if (word) {
      setTooltip({
        visible: true,
        word,
        x: event.clientX,
        y: event.clientY
      });
    }
  };

  const handleWordLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  useEffect(() => {
    const highlightElements = document.querySelectorAll('.highlight');
    highlightElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        const wordId = (e.target as HTMLElement).dataset.wordId;
        if (wordId) {
          handleWordHover(wordId, e as any);
        }
      });
      element.addEventListener('mouseleave', handleWordLeave);
    });

    return () => {
      highlightElements.forEach(element => {
        element.removeEventListener('mouseenter', () => {});
        element.removeEventListener('mouseleave', handleWordLeave);
      });
    };
  }, [words, tooltip]);

  const readCount = readParagraphs.size;
  const progress = totalParagraphs > 0 ? (readCount / totalParagraphs) * 100 : 0;

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
      
      {/* 阅读进度条 */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">阅读进度</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
          已读: {readCount} / {totalParagraphs} 段 ({Math.round(progress)}%)
        </p>
      </div>

      {/* 学术文章 */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">学术文章</h3>
          <button
            className="btn btn-secondary"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? '隐藏中文' : '显示中文'}
          </button>
        </div>
        
        {/* 按篇章显示 */}
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="article-section">
              {/* 篇章标题 */}
              <div className="mb-4 pb-2 border-b-2 border-blue-500">
                <h4 className="text-lg font-bold text-blue-400">{section.title}</h4>
                {section.subtitle && (
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{section.subtitle}</p>
                )}
              </div>
              
              {/* 篇章段落 */}
              <div className="space-y-6">
                {section.paragraphs.map((paragraph, paragraphIndex) => {
                  const isRead = readParagraphs.has(`${sectionIndex}-${paragraphIndex}`);
                  return (
                    <div 
                      key={paragraphIndex} 
                      className="article-paragraph"
                      style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: isRead ? 'rgba(56, 161, 105, 0.1)' : 'transparent',
                        border: isRead ? '1px solid var(--accent-green)' : '1px solid transparent'
                      }}
                    >
                      {/* 英文段落 */}
                      <div 
                        className="text-lg leading-relaxed mb-3"
                        dangerouslySetInnerHTML={{ __html: highlightWords(paragraph.english) }}
                      />
                      {/* 中文段落 - 根据开关显示 */}
                      {showTranslation && paragraph.chinese && (
                        <div 
                          className="text-lg leading-relaxed pl-4 border-l-4 border-blue-500 mb-4"
                          style={{ color: 'var(--text-secondary)' }}
                          dangerouslySetInnerHTML={{ __html: highlightWords(paragraph.chinese) }}
                        />
                      )}
                      {/* 已读完标记按钮 */}
                      <div className="flex justify-end mt-3">
                        <button
                          className={`btn btn-sm ${isRead ? 'btn-secondary' : 'btn-primary'}`}
                          onClick={() => handleToggleRead(sectionIndex, paragraphIndex)}
                          style={{ 
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.875rem'
                          }}
                        >
                          {isRead ? '✓ 已读完' : '标记已读完'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {tooltip.visible && tooltip.word && (
        <div 
          className="fixed rounded-lg shadow-xl border z-99999"
          style={{
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y + 10}px`,
            maxWidth: '300px',
            backgroundColor: 'rgba(43, 108, 176, 1)',
            color: 'white',
            padding: '0.6rem 0.8rem',
            borderColor: 'var(--accent-blue)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
            pointerEvents: 'none'
          }}
        >
          <h4 className="font-semibold text-lg">{tooltip.word.english}</h4>
          <p style={{ color: 'var(--accent-orange)', fontSize: '0.875rem' }}>{tooltip.word.phonetic}</p>
          <p style={{ color: 'white', fontSize: '0.875rem' }}>{tooltip.word.partOfSpeech}</p>
          <p className="mt-1" style={{ color: 'white' }}>{tooltip.word.chinese}</p>
          {tooltip.word.example && (
            <p className="mt-2 text-white text-sm italic">{tooltip.word.example}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleReader;
