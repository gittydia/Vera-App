import { VerdictBadge } from './VerdictBadge';
import { ScoreBar } from './ScoreBar';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';
import { ProductDetail } from './ProductDetail';

interface VerdictCardProps {
  verdict: 'Safe' | 'Caution' | 'High Risk';
  productName: string;
  store: string;
  score: number;
  reasons: string[];
}

export function VerdictCard({ verdict, productName, store, score, reasons }: VerdictCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const verdictTypeMap = {
    'Safe': 'safe' as const,
    'Caution': 'caution' as const,
    'High Risk': 'danger' as const
  };

  const type = verdictTypeMap[verdict];

  const verdictColors = {
    safe: '#22C55E',
    caution: '#F59E0B',
    danger: '#EF4444'
  };

  return (
    <>
      <Card className="animate-[slideUp_0.3s_ease-out] cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setIsDetailOpen(true)}>
        <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-4">
          <VerdictBadge type={type} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span style={{ color: verdictColors[type] }}>{verdict}</span>
              <span style={{ color: 'var(--text-tertiary)' }}>·</span>
              <span style={{ color: 'var(--text-secondary)' }}>{store}</span>
            </div>
            <div>{productName}</div>
          </div>
        </div>

        <ScoreBar score={score} type={type} />

        <div className="mt-4 space-y-2">
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Why?</div>
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: verdictColors[type] }}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{reason}</span>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          onClick={(e) => {
            e.stopPropagation();
            setIsDetailOpen(true);
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>

    <ProductDetail
      isOpen={isDetailOpen}
      onClose={() => setIsDetailOpen(false)}
      verdict={verdict}
      productName={productName}
      store={store}
      score={score}
      reasons={reasons}
    />
    </>
  );
}
