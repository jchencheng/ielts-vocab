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

  // 导航栏组件
  const Navbar = () => (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo" onClick={() => {
          setHasSelectedUnit(false)
          setShowWrongWords(false)
          setShowWrongWordsTest(false)
          setActiveTab('preview')
        }}>
          📚 IELTS Vocabulary
        </a>
        <nav className="navbar-nav">
          <button
            className={`nav-link ${showWrongWords ? 'active' : ''}`}
            onClick={() => {
              setShowWrongWords(true)
              setShowWrongWordsTest(false)
              setHasSelectedUnit(false)
            }}
          >
            错题本
          </button>
          <button
            className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('settings')
              setShowWrongWords(false)
              setShowWrongWordsTest(false)
              setHasSelectedUnit(false)
            }}
          >
            设置
          </button>
          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )

  // 学习页面导航
  const StudyNavbar = () => (
    <>
      <header className="navbar" style={{ zIndex: 1001 }}>
        <div className="navbar-container">
          <a href="#" className="navbar-logo" onClick={handleBackToUnits}>
            ← 返回单元列表
          </a>
          <nav className="navbar-nav">
            <button
              className={`nav-link ${showWrongWords ? 'active' : ''}`}
              onClick={() => {
                setShowWrongWords(true)
                setShowWrongWordsTest(false)
              }}
            >
              错题本
            </button>
            <button
              className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('settings')
                setShowWrongWords(false)
                setShowWrongWordsTest(false)
              }}
            >
              设置
            </button>
            <button
              className="theme-toggle"
              onClick={toggleDarkMode}
              title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </header>
      <nav className="study-nav">
        <div className="study-nav-container">
          <div className="study-nav-links">
            {[
              { id: 'preview', label: '单词预习', icon: '📖' },
              { id: 'article', label: '文章阅读', icon: '📄' },
              { id: 'test', label: '单元测试', icon: '✏️' },
              { id: 'stats', label: '学习统计', icon: '📊' },
              { id: 'custom-article', label: '自定义文章', icon: '✍️' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`study-nav-link ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id)
                  setShowWrongWords(false)
                  setShowWrongWordsTest(false)
                }}
              >
                <span className="study-nav-icon">{tab.icon}</span>
                <span className="study-nav-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )

  // 页脚组件
  const Footer = () => (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          IELTS Vocabulary Learning App © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )

  // 设置页面
  const SettingsPage = () => (
    <div className="page-content">
      <div className="page-header">
        <button 
          className="btn btn-secondary"
          onClick={() => {
            setActiveTab('preview')
            setShowWrongWords(false)
            setShowWrongWordsTest(false)
          }}
        >
          ← 返回
        </button>
        <h1 className="page-title">设置</h1>
      </div>
      
      <div className="settings-grid">
        <div className="card">
          <div className="card-header">
            <span className="card-icon">💾</span>
            <h3 className="card-title">数据管理</h3>
          </div>
          <div className="card-body">
            <p className="card-description">导出或导入您的学习数据，方便在不同设备间同步。</p>
            <div className="settings-actions">
              <button 
                className="btn btn-primary btn-full"
                onClick={handleExportData}
              >
                📥 导出数据
              </button>
              <div className="form-group">
                <label className="form-label">导入数据</label>
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

        <div className="card">
          <div className="card-header">
            <span className="card-icon">🎨</span>
            <h3 className="card-title">外观设置</h3>
          </div>
          <div className="card-body">
            <p className="card-description">自定义应用的外观和主题。</p>
            <div className="settings-row">
              <span>深色模式</span>
              <button
                className="theme-toggle"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // 单元选择页面
  if (!hasSelectedUnit) {
    // 错题本页面
    if (showWrongWords) {
      return (
        <div className="app">
          <Navbar />
          <main className="main-content">
            <div className="container">
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
          </main>
          <Footer />
        </div>
      )
    }

    // 错题本测试页面
    if (showWrongWordsTest) {
      return (
        <div className="app">
          <Navbar />
          <main className="main-content">
            <div className="container">
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
          </main>
          <Footer />
        </div>
      )
    }

    // 设置页面
    if (activeTab === 'settings') {
      return (
        <div className="app">
          <Navbar />
          <main className="main-content">
            <div className="container">
              <SettingsPage />
            </div>
          </main>
          <Footer />
        </div>
      )
    }

    // 单元选择主页
    return (
      <div className="app">
        <Navbar />
        <main className="main-content">
          <div className="container">
            {/* Hero Section */}
            <section className="hero">
              <h1 className="hero-title">开启您的雅思词汇学习之旅</h1>
              <p className="hero-subtitle">
                共 {units.length} 个学习单元，每个单元包含 {units[0]?.words?.length || 0} 个精选词汇
              </p>
            </section>

            {/* Overall Progress */}
            {overallProgress && (
              <section className="progress-section">
                <div className="card progress-card">
                  <div className="progress-card-header">
                    <h2 className="progress-card-title">总体学习进度</h2>
                    <span className="progress-percentage">{Math.round(overallProgress.overallProgress)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${overallProgress.overallProgress}%` }}
                    />
                  </div>
                  <div className="progress-stats">
                    <div className="progress-stat">
                      <span className="progress-stat-value">{Math.round(overallProgress.wordsProgress)}%</span>
                      <span className="progress-stat-label">单词掌握</span>
                      <span className="progress-stat-detail">{overallProgress.studiedWords}/{overallProgress.totalWords}</span>
                    </div>
                    <div className="progress-stat">
                      <span className="progress-stat-value">{Math.round(overallProgress.readingProgress)}%</span>
                      <span className="progress-stat-label">文章阅读</span>
                      <span className="progress-stat-detail">{overallProgress.readParagraphs}/{overallProgress.totalParagraphs}</span>
                    </div>
                    <div className="progress-stat">
                      <span className="progress-stat-value">{Math.round(overallProgress.testProgress)}%</span>
                      <span className="progress-stat-label">单元测试</span>
                      <span className="progress-stat-detail">{overallProgress.completedTests}/{overallProgress.totalUnits}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Continue Learning */}
            {lastProgress && (
              <section className="continue-section">
                <div 
                  className="card continue-card"
                  onClick={() => {
                    setCurrentUnitIdState(lastProgress.unitId)
                    setCurrentUnit(lastProgress.unitId)
                    setActiveTab(lastProgress.activeTab)
                    setHasSelectedUnit(true)
                  }}
                >
                  <div className="continue-content">
                    <div className="continue-icon">🎯</div>
                    <div className="continue-info">
                      <h3 className="continue-title">继续上次学习</h3>
                      <p className="continue-unit">{lastProgress.unitName}</p>
                      <p className="continue-time">
                        上次学习: {new Date(lastProgress.lastLearningTime).toLocaleString('zh-CN')}
                      </p>
                      <span className="continue-badge">
                        {lastProgress.activeTab === 'preview' ? '📖 单词预习' : 
                         lastProgress.activeTab === 'article' ? '📄 文章阅读' : 
                         lastProgress.activeTab === 'test' ? '✏️ 单元测试' : 
                         lastProgress.activeTab === 'stats' ? '📊 学习统计' : '📖 单词预习'}
                      </span>
                    </div>
                    <button className="btn btn-primary continue-btn">
                      继续学习 →
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Unit Grid */}
            <section className="units-section">
              <h2 className="section-title">选择学习单元</h2>
              <div className="units-grid">
                {units.map((unit, index) => (
                  <div
                    key={unit.id}
                    className="unit-card"
                    onClick={() => handleUnitChange(unit.id)}
                  >
                    <div className="unit-card-header">
                      <span className="unit-number">Unit {index + 1}</span>
                      {isUnitCompleted(unit.id) && (
                        <span className="unit-completed">✓</span>
                      )}
                    </div>
                    <div className="unit-card-body">
                      <h3 className="unit-name">{unit.name}</h3>
                      <p className="unit-words">{unit.words?.length || 0} 个单词</p>
                    </div>
                    <div className="unit-card-footer">
                      <span className="unit-action">
                        {isUnitCompleted(unit.id) ? '继续学习 →' : '开始学习 →'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 学习页面
  return (
    <div className="app">
      <StudyNavbar />
      <main className="main-content study-content">
        <div className="container">
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
                setActiveTab('article')
              }}
            />
          ) : activeTab === 'settings' ? (
            <SettingsPage />
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
