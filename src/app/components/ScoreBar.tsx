import { useEffect, useState } from 'react';

interface ScoreBarProps {
  score: number;
  type: 'safe' | 'caution' | 'danger';
}

export function ScoreBar({ score, type }: ScoreBarProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  const colors = {
    safe: '#22C55E',
    caution: '#F59E0B',
    danger: '#EF4444'
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Credibility score</span>
        <span className="text-sm" style={{ color: colors[type] }}>
          {score}%
        </span>
      </div>
      <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${animatedScore}%`,
            backgroundColor: colors[type]
          }}
        />
      </div>
    </div>
  );
}
