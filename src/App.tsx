import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { getData, saveData, setCurrentUnit, getLearningProgress, saveLearningProgress, getOverallProgress } from './dataService'
import WordPreview from './components/WordPreview'
import ArticleReader from './components/ArticleReader'
import Test from './components/Test'
import Stats from './components/Stats'
import WrongWords from './components/WrongWords'
import WrongWordsTest from './components/WrongWordsTest'
import CustomArticleEditor from './components/CustomArticleEditor'
import { LearningProgress, TestResult } from './types'

interface OverallProgress {
  totalUnits: number;
  totalWords: number;
  studiedWords: number;
  wordsProgress: number;
  totalParagraphs: number;
  readParagraphs: number;
  readingProgress: number;
  completedTests: number;
  testProgress: number;
  overallProgress: number;
}

function App() {
  const [currentUnitId, setCurrentUnitIdState] = useState('')
  const [activeTab, setActiveTab] = useState('preview')
  const [units, setUnits] = useState<any[]>([])
  const [hasSelectedUnit, setHasSelectedUnit] = useState(false)
  const [lastProgress, setLastProgress] = useState<LearningProgress | null>(null)
  const [overallProgress, setOverallProgress] = useState<OverallProgress | null>(null)
  const [showWrongWords, setShowWrongWords] = useState(false)
  const [showWrongWordsTest, setShowWrongWordsTest] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  const [testResults, setTestResults] = useState<TestResult[]>([])

  const isUnitCompleted = useMemo(() => {
    const completedSet = new Set(testResults.map(r => r.unitId))
    return (unitId: string) => completedSet.has(unitId)
  }, [testResults])

  useEffect(() => {
    const loadData = async () => {
      const data = await getData()
      setUnits(data.units)
      setCurrentUnitIdState(data.currentUnitId)
      setTestResults(data.testResults || [])
      
      const progress = await getLearningProgress()
      setLastProgress(progress || null)
      
      const overall = await getOverallProgress()
      setOverallProgress(overall)
    }
    loadData()
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // 保存学习进度
  useEffect(() => {
    const saveProgress = async () => {
      if (hasSelectedUnit && currentUnitId) {
        const unit = units.find(u => u.id === currentUnitId)
        if (unit) {
          await saveLearningProgress({
            unitId: currentUnitId,
            unitName: unit.name,
            activeTab: activeTab
          })
        }
      }
    }
    saveProgress()
  }, [hasSelectedUnit, currentUnitId, activeTab, units])

  const handleUnitChange = async (unitId: string) => {
    setCurrentUnitIdState(unitId)
    await setCurrentUnit(unitId)
    setActiveTab('preview')
    setHasSelectedUnit(true)
  }

  const handleBackToUnits = () => {
    setHasSelectedUnit(false)
  }

  const handleExportData = async () => {
    try {
      const data = await getData()
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'ielts-vocab-data.json'
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('导出数据失败，请重试。')
    }
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string)
          // 存储到localStorage
          localStorage.setItem('ielts-pwa-data', JSON.stringify(importedData))
          // 同步到IndexedDB
          saveData(importedData).then(() => {
            alert('数据导入成功！')
            window.location.reload()
          }).catch((error) => {
            console.error('Error saving data to IndexedDB:', error)
            alert('数据导入成功！')
            window.location.reload()
          })
        } catch (error) {
          alert('数据导入失败，请确保文件格式正确。')
        }
      }
      reader.readAsText(file)
    }
  }

  // 单元选择页面
  if (!hasSelectedUnit) {
    // 如果用户点击了错题本按钮，显示错题本页面
    if (showWrongWords) {
      return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          {/* Header */}
          <header className="navbar">
            <div className="navbar-container">
              <a href="#" className="navbar-logo">IELTS 单词记忆</a>
              <div className="top-nav-actions">
                <button
                  className={`navbar-link ${showWrongWords ? 'active' : ''}`}
                  onClick={() => {
                    setShowWrongWords(true)
                    setShowWrongWordsTest(false)
                  }}
                >
                  错题本
                </button>
                <button
                  className={`navbar-link ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('settings')
                    setShowWrongWords(false)
                    setShowWrongWordsTest(false)
                  }}
                >
                  设置
                </button>
                <button
                  className="theme-toggle-btn"
                  onClick={toggleDarkMode}
                  title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </header>

          {/* Wrong Words Page */}
          <div className="page-container">
            <div className="content-card">
              <WrongWords 
                onSwitchUnit={() => {
                  setShowWrongWords(false)
                  setShowWrongWordsTest(false)
                  setActiveTab('preview')
                }} 
                onStartTest={() => {
                  setShowWrongWords(false)
                  setShowWrongWordsTest(true)
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <footer style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem 0', marginTop: 'auto' }}>
            <div className="max-w-6xl mx-auto text-center" style={{ color: 'var(--text-primary)' }}>
              <p>IELTS 单词记忆应用 © {new Date().getFullYear()}</p>
            </div>
          </footer>
        </div>
      )
    }

    // 如果用户点击了错题本测试按钮，显示错题本测试页面
    if (showWrongWordsTest) {
      return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          {/* Header */}
          <header className="navbar">
            <div className="navbar-container">
              <a href="#" className="navbar-logo">IELTS 单词记忆</a>
              <div className="top-nav-actions">
                <button
                  className={`navbar-link ${showWrongWords ? 'active' : ''}`}
                  onClick={() => {
                    setShowWrongWords(true)
                    setShowWrongWordsTest(false)
                  }}
                >
                  错题本
                </button>
                <button
                  className={`navbar-link ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('settings')
                    setShowWrongWords(false)
                    setShowWrongWordsTest(false)
                  }}
                >
                  设置
                </button>
                <button
                  className="theme-toggle-btn"
                  onClick={toggleDarkMode}
                  title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </header>

          {/* Wrong Words Test Page */}
          <div className="page-container">
            <div className="content-card">
              <WrongWordsTest 
                onSwitchUnit={() => {
                  setShowWrongWords(false)
                  setShowWrongWordsTest(false)
                  setActiveTab('preview')
                }} 
                onBackToWrongWords={() => {
                  setShowWrongWordsTest(false)
                  setShowWrongWords(true)
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <footer style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem 0', marginTop: 'auto' }}>
            <div className="max-w-6xl mx-auto text-center" style={{ color: 'var(--text-primary)' }}>
              <p>IELTS 单词记忆应用 © {new Date().getFullYear()}</p>
            </div>
          </footer>
        </div>
      )
    }

    // 如果用户点击了设置按钮，显示设置页面
    if (activeTab === 'settings') {
      return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          {/* Header */}
          <header className="navbar">
            <div className="navbar-container">
              <a href="#" className="navbar-logo">IELTS 单词记忆</a>
              <div className="top-nav-actions">
                <button
                  className={`navbar-link ${showWrongWords ? 'active' : ''}`}
                  onClick={() => {
                    setShowWrongWords(true)
                    setShowWrongWordsTest(false)
                  }}
                >
                  错题本
                </button>
                <button
                  className={`navbar-link ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('settings')
                    setShowWrongWords(false)
                    setShowWrongWordsTest(false)
                  }}
                >
                  设置
                </button>
                <button
                  className="theme-toggle-btn"
                  onClick={toggleDarkMode}
                  title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </header>

          {/* Settings Page */}
          <div className="page-container">
            <div className="content-card">
              <div className="flex items-center gap-4 mb-6">
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setActiveTab('preview')
                    setShowWrongWords(false)
                    setShowWrongWordsTest(false)
                  }}
                >
                  返回
                </button>
                <h2 className="text-2xl font-bold">设置</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">数据管理</h3>
                  <div className="space-y-4">
                    <button 
                      className="btn btn-primary w-full"
                      onClick={handleExportData}
                    >
                      导出数据
                    </button>
                    <div>
                      <label className="block mb-2">导入数据</label>
                      <input 
                        type="file" 
                        accept=".json" 
                        onChange={handleImportData}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem 0', marginTop: 'auto' }}>
            <div className="max-w-6xl mx-auto text-center" style={{ color: 'var(--text-primary)' }}>
              <p>IELTS 单词记忆应用 © {new Date().getFullYear()}</p>
            </div>
          </footer>
        </div>
      )
    }

    // 否则显示单元选择页面
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        {/* Header */}
        <header className="navbar">
          <div className="navbar-container">
            <a href="#" className="navbar-logo">IELTS 单词记忆</a>
            <div className="top-nav-actions">
              <button
                className={`navbar-link ${showWrongWords ? 'active' : ''}`}
                onClick={() => {
                  setShowWrongWords(true)
                  setShowWrongWordsTest(false)
                }}
              >
                错题本
              </button>
              <button
                className={`navbar-link ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                设置
              </button>
              <button
                className="theme-toggle-btn"
                onClick={toggleDarkMode}
                title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        {/* Unit Selection Page */}
        <div className="page-container">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">选择学习单元</h1>
            <p className="text-lg" style={{ color: 'var(--text-primary)' }}>
              共有 {units.length} 个单元，每个单元包含约 {units[0]?.words?.length || 0} 个单词
            </p>
          </div>

          {/* 总体学习进度 */}
          {overallProgress && (
            <div className="mb-8">
              <div className="content-card" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h3 className="text-xl font-semibold mb-4">总体学习进度</h3>
                
                {/* 总体进度条 */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">总进度</span>
                    <span className="text-sm font-medium">{Math.round(overallProgress.overallProgress)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${overallProgress.overallProgress}%` }}
                    />
                  </div>
                </div>
                
                {/* 详细统计 - 单行显示，响应式适配 */}
                <div className="flex flex-wrap justify-between gap-2 mt-4">
                  {/* 单词进度 */}
                  <div className="flex-1 min-w-[100px] p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div className="text-center">
                      <span className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>单词掌握</span>
                      <span className="text-lg font-bold">{Math.round(overallProgress.wordsProgress)}%</span>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {overallProgress.studiedWords}/{overallProgress.totalWords}
                      </p>
                    </div>
                  </div>
                  
                  {/* 阅读进度 */}
                  <div className="flex-1 min-w-[100px] p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div className="text-center">
                      <span className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>文章阅读</span>
                      <span className="text-lg font-bold">{Math.round(overallProgress.readingProgress)}%</span>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {overallProgress.readParagraphs}/{overallProgress.totalParagraphs}
                      </p>
                    </div>
                  </div>
                  
                  {/* 测试进度 */}
                  <div className="flex-1 min-w-[100px] p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div className="text-center">
                      <span className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>单元测试</span>
                      <span className="text-lg font-bold">{Math.round(overallProgress.testProgress)}%</span>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {overallProgress.completedTests}/{overallProgress.totalUnits}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 上次学习进度 */}
          {lastProgress && (
            <div className="mb-8">
              <div 
                className="content-card cursor-pointer hover:opacity-90 transition-opacity"
                style={{ 
                  backgroundColor: 'var(--accent-blue)', 
                  border: '2px solid var(--accent-blue-hover)',
                  position: 'relative'
                }}
                onClick={() => {
                  setCurrentUnitIdState(lastProgress.unitId)
                  setCurrentUnit(lastProgress.unitId)
                  setActiveTab(lastProgress.activeTab)
                  setHasSelectedUnit(true)
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">继续上次学习</h3>
                    <p className="text-sm opacity-90">
                      单元: {lastProgress.unitName}
                    </p>
                    <p className="text-sm opacity-90">
                      上次学习: {new Date(lastProgress.lastLearningTime).toLocaleString('zh-CN')}
                    </p>
                    <p className="text-sm opacity-90">
                      进度: {lastProgress.activeTab === 'preview' ? '单词预习' : 
                             lastProgress.activeTab === 'article' ? '文章阅读' : 
                             lastProgress.activeTab === 'test' ? '单元测试' : 
                             lastProgress.activeTab === 'stats' ? '学习统计' : '单词预习'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="btn" style={{ backgroundColor: 'white', color: 'var(--accent-blue)' }}>
                      继续学习 →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="unit-card"
                onClick={() => handleUnitChange(unit.id)}
              >
                <div className="unit-card-header">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold flex-1">{unit.name}</h3>
                    {isUnitCompleted(unit.id) && (
                      <span className="ml-2 text-2xl" style={{ color: 'var(--accent-green)' }}>
                        ✅
                      </span>
                    )}
                  </div>
                </div>
                <div className="unit-card-body">
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    单词数量: {unit.words?.length || 0}
                  </p>
                  <div className="mt-4">
                    <span className="btn btn-primary">
                      {isUnitCompleted(unit.id) ? '继续学习' : '开始学习'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem 0', marginTop: 'auto' }}>
          <div className="max-w-6xl mx-auto text-center" style={{ color: 'var(--text-primary)' }}>
            <p>IELTS 单词记忆应用 © {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    )
  }

  // 学习页面
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Top Navigation Bar */}
      <nav className="navbar-top">
        <div className="navbar-container">
          <a href="#" className="navbar-logo" onClick={handleBackToUnits}>IELTS 单词记忆</a>
          <div className="top-nav-actions">
            <button
              className={`navbar-link ${showWrongWords ? 'active' : ''}`}
              onClick={() => {
                setShowWrongWords(true)
                setShowWrongWordsTest(false)
              }}
            >
              错题本
            </button>
            <button
              className={`navbar-link ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('settings')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              设置
            </button>
            <button
              className="theme-toggle-btn"
              onClick={toggleDarkMode}
              title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main Navigation Bar */}
      <nav className="navbar-main">
        <div className="navbar-container">
          <div className="main-nav-links">
            <button
              className={`navbar-link ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('preview')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              预习
            </button>
            <button
              className={`navbar-link ${activeTab === 'article' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('article')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              学习
            </button>
            <button
              className={`navbar-link ${activeTab === 'test' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('test')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              测试
            </button>
            <button
              className={`navbar-link ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('stats')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              统计
            </button>
            <button
              className={`navbar-link ${activeTab === 'custom-article' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('custom-article')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              自定义文章
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <nav className="navbar-mobile">
        <div className="navbar-container">
          <div className="mobile-nav-links">
            <button
              className={`navbar-link ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('preview')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              预习
            </button>
            <button
              className={`navbar-link ${activeTab === 'article' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('article')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              学习
            </button>
            <button
              className={`navbar-link ${activeTab === 'test' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('test')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              测试
            </button>
            <button
              className={`navbar-link ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('stats')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              统计
            </button>
            <button
              className={`navbar-link ${activeTab === 'custom-article' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('custom-article')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              自定义文章
            </button>
            <button
              className={`navbar-link ${showWrongWords ? 'active' : ''}`}
              onClick={() => {
                setShowWrongWords(true)
                setShowWrongWordsTest(false)
              }}
            >
              错题本
            </button>
            <button
              className={`navbar-link ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('settings')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              设置
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="page-container">
        <div className="content-card">
          {showWrongWordsTest ? (
            <WrongWordsTest 
              onSwitchUnit={() => {
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
                setActiveTab('preview')
              }} 
              onBackToWrongWords={() => {
                setShowWrongWordsTest(false)
                setShowWrongWords(true)
              }}
            />
          ) : showWrongWords ? (
            <WrongWords 
              onSwitchUnit={() => {
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
                setActiveTab('preview')
              }} 
              onStartTest={() => {
                setShowWrongWords(false)
                setShowWrongWordsTest(true)
              }}
            />
          ) : activeTab === 'preview' ? (
            <WordPreview unitId={currentUnitId} onSwitchUnit={handleBackToUnits} />
          ) : activeTab === 'article' ? (
            <ArticleReader unitId={currentUnitId} onSwitchUnit={handleBackToUnits} />
          ) : activeTab === 'test' ? (
            <Test 
              unitId={currentUnitId} 
              onSwitchUnit={handleBackToUnits}
              onTestComplete={async () => {
                try {
                  const data = await getData();
                  setTestResults(data.testResults || []);
                  const progress = await getOverallProgress();
                  setOverallProgress(progress);
                } catch (error) {
                  console.error('Error updating test results:', error);
                }
              }}
            />
          ) : activeTab === 'stats' ? (
            <Stats unitId={currentUnitId} onSwitchUnit={handleBackToUnits} />
          ) : activeTab === 'custom-article' ? (
            <CustomArticleEditor 
              unitId={currentUnitId} 
              onSave={() => {
                // 保存成功后，切换到学习标签页，以便查看自定义文章
                setActiveTab('article')
              }}
            />
          ) : activeTab === 'settings' ? (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setActiveTab('preview')
                    setShowWrongWords(false)
                    setShowWrongWordsTest(false)
                  }}
                >
                  返回
                </button>
                <h2 className="text-2xl font-bold">设置</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">数据管理</h3>
                  <div className="space-y-4">
                    <button 
                      className="btn btn-primary w-full"
                      onClick={handleExportData}
                    >
                      导出数据
                    </button>
                    <div>
                      <label className="block mb-2">导入数据</label>
                      <input 
                        type="file" 
                        accept=".json" 
                        onChange={handleImportData}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem 0', marginTop: 'auto' }}>
        <div className="max-w-6xl mx-auto text-center" style={{ color: 'var(--text-primary)' }}>
          <p>IELTS 单词记忆应用 © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
