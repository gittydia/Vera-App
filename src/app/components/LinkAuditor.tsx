import { useState } from 'react';
import { VerdictCard } from './VerdictCard';
import { Link } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

const mockRecentChecks = [
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
  }
];

export function LinkAuditor() {
  const [url, setUrl] = useState('');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      // Fallback: focus input so user can paste manually
      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Badge>Link Auditor</Badge>
          <h1 className="text-2xl leading-tight">
            Check product<br />authenticity instantly
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Paste any product link to verify safety</p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/product..."
              className="pr-20"
            />
            <Button
              onClick={handlePaste}
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A78BFA]"
            >
              Paste
            </Button>
          </div>

          <Button className="w-full" size="lg">
            <Link className="w-5 h-5" />
            Check this product
          </Button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <h3 style={{ color: 'var(--text-secondary)' }}>Recent checks</h3>
        <div className="space-y-3">
          {mockRecentChecks.map((check, idx) => (
            <VerdictCard key={idx} {...check} />
          ))}
        </div>
      </div>
    </div>
  );
}
