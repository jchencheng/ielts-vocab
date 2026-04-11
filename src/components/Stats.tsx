import { useEffect, useState } from 'react';
import { getData, getHighestScore, getTestCount } from '../dataService';
import { TestResult } from '../types';

interface StatsProps {
  unitId: string;
  onSwitchUnit?: () => void;
}

const Stats: React.FC<StatsProps> = ({ unitId, onSwitchUnit }) => {
  const [unitName, setUnitName] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [highestScore, setHighestScore] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      const unit = data.units.find(u => u.id === unitId);
      if (unit) {
        setUnitName(unit.name);
      }
      
      const results = data.testResults.filter(result => result.unitId === unitId);
      setTestResults(results);
      setHighestScore(await getHighestScore(unitId));
      setTestCount(await getTestCount(unitId));
      
      if (results.length > 0) {
        const totalScore = results.reduce((sum, result) => sum + result.score, 0);
        setAverageScore(totalScore / results.length);
      } else {
        setAverageScore(0);
      }
    };
    loadData();
  }, [unitId]);

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

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="card stat-card">
          <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>🏆</div>
          <div className="stat-value">{highestScore}</div>
          <div className="stat-label">最高分</div>
        </div>
        <div className="card stat-card">
          <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>📝</div>
          <div className="stat-value">{testCount}</div>
          <div className="stat-label">测试次数</div>
        </div>
        <div className="card stat-card">
          <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>📊</div>
          <div className="stat-value">{averageScore.toFixed(1)}</div>
          <div className="stat-label">平均分</div>
        </div>
      </div>

      {/* History */}
      <div className="card">
        <div className="card-header">
          <span className="card-icon">📈</span>
          <h3 className="card-title">测试历史</h3>
        </div>
        <div className="card-body">
          {testResults.length === 0 ? (
            <div className="empty-state" style={{ padding: 'var(--space-8)' }}>
              <div className="empty-state-icon">📭</div>
              <h4 className="empty-state-title">暂无测试记录</h4>
              <p className="empty-state-description">完成单元测试后，您的测试记录将显示在这里</p>
            </div>
          ) : (
            <div className="history-list">
              {testResults.map((result, index) => {
                const date = new Date(result.date).toLocaleString('zh-CN');
                const percentage = (result.score / result.total * 100);
                return (
                  <div key={index} className="history-item">
                    <div className="history-info">
                      <div className="history-date">{date}</div>
                      <div className="history-score">
                        {result.score} / {result.total} ({percentage.toFixed(0)}%)
                      </div>
                    </div>
                    <div className="history-bar">
                      <div 
                        className="history-bar-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
