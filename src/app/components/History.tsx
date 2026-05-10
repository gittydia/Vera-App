import { VerdictCard } from './VerdictCard';
import { ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useTheme } from '../context/ThemeContext';
import darkLogo from '../../imports/dark_mode.png';
import lightLogo from '../../imports/light_mode.png';

const mockHistory = [
  {
    verdict: 'Safe' as const,
    productName: 'Organic Multivitamin Complex',
    store: 'Amazon',
    score: 87,
    reasons: [
      'FDA-approved facility',
      'Third-party tested for purity',
      'Transparent ingredient sourcing'
    ]
  },
  {
    verdict: 'Caution' as const,
    productName: 'Weight Loss Tea Blend',
    store: 'HealthStore',
    score: 54,
    reasons: [
      'Contains undisclosed caffeine levels',
      'Limited clinical testing data',
      'Mixed consumer reviews'
    ]
  },
  {
    verdict: 'High Risk' as const,
    productName: 'Maximum Power Pills',
    store: 'OnlineSupplements',
    score: 23,
    reasons: [
      'Banned substances detected',
      'No quality certifications',
      'Multiple FDA warnings issued'
    ]
  },
  {
    verdict: 'Safe' as const,
    productName: 'Certified Protein Powder',
    store: 'GNC',
    score: 92,
    reasons: [
      'NSF Certified for Sport',
      'No banned substances',
      'Verified manufacturing standards'
    ]
  },
  {
    verdict: 'Caution' as const,
    productName: 'Energy Boost Formula',
    store: 'VitaminWorld',
    score: 61,
    reasons: [
      'High stimulant content',
      'Limited long-term safety data',
      'Some unverified health claims'
    ]
  }
];

export function History() {
  const navigate = useNavigate();
  const { theme } = useTheme();

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
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{mockHistory.length} products scanned</p>
            <button className="text-sm text-[#A78BFA] hover:text-[#7C3AED] transition-colors">
              Clear all
            </button>
          </div>

          <div className="space-y-3">
            {mockHistory.map((item, idx) => (
              <VerdictCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
