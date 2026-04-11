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

  const highlightWords = (text: string, isChinese: boolean = false) => {
    let result = text;
    // 处理换行符，将其替换为<br>标签
    result = result.replace(/\n/g, '<br>');
    if (!isChinese) {
      words.forEach(word => {
        const regex = new RegExp(`\\b${word.english}\\b`, 'gi');
        result = result.replace(regex, (match) => {
          return `<span class="highlight" data-word-id="${word.id}">${match}</span>`;
        });
      });
    }
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

      {/* Progress Card */}
      <div className="card mb-6">
        <div className="card-header">
          <span className="card-icon">📖</span>
          <h3 className="card-title">阅读进度</h3>
        </div>
        <div className="card-body">
          <div className="progress-bar" style={{ marginBottom: 'var(--space-3)' }}>
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <span>已读 {readCount} / {totalParagraphs} 段</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="card">
        <div className="card-header" style={{ justifyContent: 'space-between' }}>
          <div className="flex items-center gap-3">
            <span className="card-icon">📝</span>
            <h3 className="card-title">学术文章</h3>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? '隐藏翻译' : '显示翻译'}
          </button>
        </div>
        
        <div className="card-body" style={{ marginTop: 'var(--space-4)' }}>
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="article-section">
              <h4 className="article-title">{section.title}</h4>
              {section.subtitle && (
                <p className="article-subtitle">{section.subtitle}</p>
              )}
              
              <div style={{ marginTop: 'var(--space-6)' }}>
                {section.paragraphs.map((paragraph, paragraphIndex) => {
                  const isRead = readParagraphs.has(`${sectionIndex}-${paragraphIndex}`);
                  return (
                    <div 
                      key={paragraphIndex} 
                      className={`article-paragraph ${isRead ? 'read' : ''}`}
                    >
                      <div 
                        className="article-text"
                        dangerouslySetInnerHTML={{ __html: highlightWords(paragraph.english, false) }}
                      />
                      {showTranslation && paragraph.chinese && (
                        <div 
                          className="article-translation"
                          dangerouslySetInnerHTML={{ __html: highlightWords(paragraph.chinese, true) }}
                        />
                      )}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
                        <button
                          className={`btn btn-sm ${isRead ? 'btn-secondary' : 'btn-success'}`}
                          onClick={() => handleToggleRead(sectionIndex, paragraphIndex)}
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

      {/* Word Tooltip */}
      {tooltip.visible && tooltip.word && (
        <div 
          className="word-tooltip"
          style={{
            left: `${Math.min(tooltip.x + 10, window.innerWidth - 320)}px`,
            top: `${tooltip.y + 10}px`,
          }}
        >
          <div className="word-tooltip-title">{tooltip.word.english}</div>
          <div className="word-tooltip-phonetic">{tooltip.word.phonetic}</div>
          <div className="word-tooltip-pos">{tooltip.word.partOfSpeech}</div>
          <div className="word-tooltip-meaning">{tooltip.word.chinese}</div>
          {tooltip.word.example && (
            <div className="word-tooltip-example">{tooltip.word.example}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleReader;
