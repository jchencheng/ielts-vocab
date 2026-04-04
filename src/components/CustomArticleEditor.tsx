import { useState, useEffect } from 'react';
import { saveCustomArticle, getCustomArticle, deleteCustomArticle, getData } from '../dataService';
import { ArticleSection, Word } from '../types';

interface CustomArticleEditorProps {
  unitId: string;
  onSave: () => void;
}

const CustomArticleEditor: React.FC<CustomArticleEditorProps> = ({ unitId, onSave }) => {
  const [sections, setSections] = useState<ArticleSection[]>([
    {
      title: '学术文章',
      subtitle: '',
      paragraphs: [
        {
          english: '',
          chinese: ''
        }
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [fullText, setFullText] = useState('');
  const [fullTextChinese, setFullTextChinese] = useState('');
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const loadCustomArticle = async () => {
      setIsLoading(true);
      try {
        // 获取本单元的单词列表
        const data = await getData();
        const unit = data.units.find(u => u.id === unitId);
        if (unit) {
          setWords(unit.words);
        }
        
        // 加载自定义文章
        const customArticle = await getCustomArticle(unitId);
        if (customArticle) {
          setSections(customArticle.sections);
        }
      } catch (error) {
        console.error('Failed to load custom article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomArticle();
  }, [unitId]);

  const handleSectionTitleChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index].title = value;
    setSections(newSections);
  };

  const handleSectionSubtitleChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index].subtitle = value;
    setSections(newSections);
  };

  const handleParagraphChange = (sectionIndex: number, paragraphIndex: number, field: 'english' | 'chinese', value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].paragraphs[paragraphIndex][field] = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, {
      title: '新章节',
      subtitle: '',
      paragraphs: [
        {
          english: '',
          chinese: ''
        }
      ]
    }]);
  };

  const removeSection = (index: number) => {
    if (sections.length > 1) {
      const newSections = sections.filter((_, i) => i !== index);
      setSections(newSections);
    }
  };

  const addParagraph = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].paragraphs.push({
      english: '',
      chinese: ''
    });
    setSections(newSections);
  };

  const removeParagraph = (sectionIndex: number, paragraphIndex: number) => {
    if (sections[sectionIndex].paragraphs.length > 1) {
      const newSections = [...sections];
      newSections[sectionIndex].paragraphs = newSections[sectionIndex].paragraphs.filter((_, i) => i !== paragraphIndex);
      setSections(newSections);
    }
  };

  // 高亮文本中的单词
  const highlightWords = (text: string, isChinese: boolean = false) => {
    let result = text;
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

  // 自动识别段落并更新sections
  useEffect(() => {
    if (fullText || fullTextChinese) {
      // 分割英文段落（按空行），保留段落内部的换行
      const englishParagraphs = fullText
        .split(/\n\s*\n/)
        .map(p => p.replace(/\n\s*/g, '\n').trim())
        .filter(p => p !== '');
      
      // 分割中文段落（按空行），保留段落内部的换行
      const chineseParagraphs = fullTextChinese
        .split(/\n\s*\n/)
        .map(p => p.replace(/\n\s*/g, '\n').trim())
        .filter(p => p !== '');
      
      // 确保段落数量一致
      const maxParagraphs = Math.max(englishParagraphs.length, chineseParagraphs.length);
      const paragraphs = [];
      
      for (let i = 0; i < maxParagraphs; i++) {
        paragraphs.push({
          english: englishParagraphs[i] || '',
          chinese: chineseParagraphs[i] || ''
        });
      }
      
      // 更新sections
      setSections([{
        title: '学术文章',
        subtitle: '',
        paragraphs
      }]);
    }
  }, [fullText, fullTextChinese]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveCustomArticle(unitId, { sections });
      onSave();
    } catch (error) {
      console.error('Failed to save custom article:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('确定要删除自定义文章吗？这将恢复为默认文章。')) {
      setIsSaving(true);
      try {
        await deleteCustomArticle(unitId);
        onSave();
      } catch (error) {
        console.error('Failed to delete custom article:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">自定义文章编辑</h2>
      
      {/* 自动识别段落功能 */}
      <div className="card p-4">
        <h3 className="text-xl font-semibold mb-4">快速输入（自动识别段落）</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">英文全文（按空行分隔段落）</label>
            <textarea
              className="textarea textarea-primary w-full"
              rows={10}
              placeholder="输入英文全文，用空行分隔不同段落"
              value={fullText}
              onChange={(e) => setFullText(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">中文全文（按空行分隔段落）</label>
            <textarea
              className="textarea w-full"
              rows={8}
              placeholder="输入中文全文，用空行分隔不同段落"
              value={fullTextChinese}
              onChange={(e) => setFullTextChinese(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* 手动编辑模式 */}
      <div className="card p-4">
        <h3 className="text-xl font-semibold mb-4">手动编辑</h3>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <input
                  type="text"
                  className="input input-primary w-full"
                  placeholder="章节标题"
                  value={section.title}
                  onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
                />
                <input
                  type="text"
                  className="input w-full"
                  placeholder="章节副标题（可选）"
                  value={section.subtitle}
                  onChange={(e) => handleSectionSubtitleChange(sectionIndex, e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => addParagraph(sectionIndex)}
                >
                  添加段落
                </button>
                {sections.length > 1 && (
                  <button
                    className="btn btn-error"
                    onClick={() => removeSection(sectionIndex)}
                  >
                    删除章节
                  </button>
                )}
              </div>
            </div>
            
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <div key={paragraphIndex} className="space-y-2 mb-4 p-3 border border-gray-200 rounded">
                <div className="space-y-2">
                  <label className="text-sm font-medium">英文段落</label>
                  <div className="relative">
                    <textarea
                      className="textarea textarea-primary w-full"
                      rows={4}
                      placeholder="输入英文段落"
                      value={paragraph.english}
                      onChange={(e) => handleParagraphChange(sectionIndex, paragraphIndex, 'english', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">中文翻译（可选）</label>
                  <div className="relative">
                    <textarea
                      className="textarea w-full"
                      rows={3}
                      placeholder="输入中文翻译"
                      value={paragraph.chinese}
                      onChange={(e) => handleParagraphChange(sectionIndex, paragraphIndex, 'chinese', e.target.value)}
                    />
                  </div>
                </div>
                {section.paragraphs.length > 1 && (
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => removeParagraph(sectionIndex, paragraphIndex)}
                  >
                    删除段落
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
        
        <button
          className="btn btn-primary"
          onClick={addSection}
        >
          添加章节
        </button>
      </div>
      
      <div className="flex space-x-4">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? '保存中...' : '保存自定义文章'}
        </button>
        <button
          className="btn btn-error"
          onClick={handleDelete}
          disabled={isSaving}
        >
          删除自定义文章
        </button>
      </div>
    </div>
  );
};

export default CustomArticleEditor;