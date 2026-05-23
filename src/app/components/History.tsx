import { useState, useEffect } from 'react';
import { VerdictCard } from './VerdictCard';
import { ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useTheme } from '../context/ThemeContext';
import { api, type VerdictItem } from '../../lib/api';
import darkLogo from '../../imports/dark_mode.png';
import lightLogo from '../../imports/light_mode.png';

export function History() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [history, setHistory] = useState<VerdictItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getHistory()
      .then(setHistory)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="size-full flex flex-col" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <header className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate('/home')}
            variant="secondary"
            size="icon"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-lg">Scan History</h2>
        </div>
        <Button variant="secondary" size="icon">
          <Filter className="w-5 h-5" />
        </Button>
      </header>

      <Separator />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="w-full max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{isLoading ? 'Loading...' : `${history.length} products scanned`}</p>
          </div>

          <div className="space-y-3">
            {history.length === 0 && !isLoading && (
              <p className="text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
                No scans yet. Start by checking a product or scanning a barcode.
              </p>
            )}
            {history.map((item, idx) => (
              <VerdictCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
