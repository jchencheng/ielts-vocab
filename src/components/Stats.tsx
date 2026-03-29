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
    const data = getData();
    const unit = data.units.find(u => u.id === unitId);
    if (unit) {
      setUnitName(unit.name);
    }
    
    const results = data.testResults.filter(result => result.unitId === unitId);
    setTestResults(results);
    setHighestScore(getHighestScore(unitId));
    setTestCount(getTestCount(unitId));
    
    if (results.length > 0) {
      const totalScore = results.reduce((sum, result) => sum + result.score, 0);
      setAverageScore(totalScore / results.length);
    } else {
      setAverageScore(0);
    }
  }, [unitId]);

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <h3 className="text-lg font-semibold mb-2">最高分</h3>
          <p className="text-3xl font-bold">{highestScore}</p>
        </div>
        <div className="card text-center">
          <h3 className="text-lg font-semibold mb-2">测试次数</h3>
          <p className="text-3xl font-bold">{testCount}</p>
        </div>
        <div className="card text-center">
          <h3 className="text-lg font-semibold mb-2">平均分</h3>
          <p className="text-3xl font-bold">{averageScore.toFixed(1)}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4">测试历史</h3>
        {testResults.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>暂无测试记录</p>
        ) : (
          <div className="space-y-4">
            {testResults.map((result, index) => {
              const date = new Date(result.date).toLocaleString();
              const percentage = (result.score / result.total * 100).toFixed(0);
              return (
                <div key={index} className="flex justify-between items-center p-4" style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <div>
                    <p className="font-semibold">{date}</p>
                    <p style={{ color: 'var(--text-secondary)' }}>{result.score} / {result.total} ({percentage}%)</p>
                  </div>
                  <div className="w-1/2">
                    <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '1rem', height: '0.5rem' }}>
                      <div 
                        style={{ backgroundColor: 'var(--accent-blue)', height: '0.5rem', borderRadius: '1rem', transition: 'all 0.3s ease', width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;