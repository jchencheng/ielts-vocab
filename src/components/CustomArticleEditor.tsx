import { useState, useEffect } from 'react';
import { saveCustomArticle, getCustomArticle, deleteCustomArticle, getData } from '../dataService';
import { ArticleSection } from '../types';

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


  useEffect(() => {
    const loadCustomArticle = async () => {
      setIsLoading(true);
      try {
        // 获取本单元的单词列表
        await getData();

        
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
    return (
      <div className="animate-fade-in">
        <div className="empty-state">
          <div className="loading-spinner" style={{ marginBottom: 'var(--space-4)' }} />
          <p className="empty-state-description">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="page-title mb-6">自定义文章编辑</h1>
      
      {/* Quick Input */}
      <div className="card mb-6">
        <div className="card-header">
          <span className="card-icon">⚡</span>
          <h3 className="card-title">快速输入（自动识别段落）</h3>
        </div>
        <div className="card-body">
          <p className="card-description mb-4">
            直接粘贴英文和中文全文，系统会自动按空行分隔识别段落。
          </p>
          <div className="form-group">
            <label className="form-label">英文全文</label>
            <textarea
              className="form-textarea"
              rows={8}
              placeholder="输入英文全文，用空行分隔不同段落"
              value={fullText}
              onChange={(e) => setFullText(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">中文全文</label>
            <textarea
              className="form-textarea"
              rows={6}
              placeholder="输入中文全文，用空行分隔不同段落"
              value={fullTextChinese}
              onChange={(e) => setFullTextChinese(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Manual Edit */}
      <div className="card mb-6">
        <div className="card-header">
          <span className="card-icon">✏️</span>
          <h3 className="card-title">手动编辑</h3>
        </div>
        <div className="card-body">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: 'var(--space-4)',
                paddingBottom: 'var(--space-4)',
                borderBottom: '1px solid var(--border-light)'
              }}>
                <div style={{ flex: 1, marginRight: 'var(--space-4)' }}>
                  <input
                    type="text"
                    className="form-input mb-3"
                    placeholder="章节标题"
                    value={section.title}
                    onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="章节副标题（可选）"
                    value={section.subtitle}
                    onChange={(e) => handleSectionSubtitleChange(sectionIndex, e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => addParagraph(sectionIndex)}
                  >
                    + 段落
                  </button>
                  {sections.length > 1 && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeSection(sectionIndex)}
                    >
                      删除
                    </button>
                  )}
                </div>
              </div>
              
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <div 
                  key={paragraphIndex} 
                  style={{ 
                    marginBottom: 'var(--space-4)',
                    padding: 'var(--space-4)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div className="form-group">
                    <label className="form-label">英文段落 {paragraphIndex + 1}</label>
                    <textarea
                      className="form-textarea"
                      rows={4}
                      placeholder="输入英文段落"
                      value={paragraph.english}
                      onChange={(e) => handleParagraphChange(sectionIndex, paragraphIndex, 'english', e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">中文翻译（可选）</label>
                    <textarea
                      className="form-textarea"
                      rows={3}
                      placeholder="输入中文翻译"
                      value={paragraph.chinese}
                      onChange={(e) => handleParagraphChange(sectionIndex, paragraphIndex, 'chinese', e.target.value)}
                    />
                  </div>
                  {section.paragraphs.length > 1 && (
                    <div style={{ marginTop: 'var(--space-3)', textAlign: 'right' }}>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeParagraph(sectionIndex, paragraphIndex)}
                      >
                        删除段落
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          
          <button
            className="btn btn-secondary"
            onClick={addSection}
          >
            + 添加章节
          </button>
        </div>
      </div>
      
      {/* Actions */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? '💾 保存中...' : '💾 保存自定义文章'}
        </button>
        <button
          className="btn btn-danger btn-lg"
          onClick={handleDelete}
          disabled={isSaving}
        >
          🗑️ 删除自定义文章
        </button>
      </div>
    </div>
  );
};

export default CustomArticleEditor;
