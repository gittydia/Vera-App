import { useState } from 'react';
import { VerdictCard } from './VerdictCard';
import { Link } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { api, type VerdictItem } from '../../lib/api';

export function LinkAuditor() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<VerdictItem[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');

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

  const handleCheck = async () => {
    if (!url.trim()) return;
    setIsChecking(true);
    setError('');
    try {
      const result = await api.checkLink(url);
      setResults(prev => [result, ...prev]);
      setUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check failed');
    } finally {
      setIsChecking(false);
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

          <Button className="w-full" size="lg" onClick={handleCheck} disabled={isChecking || !url.trim()}>
            <Link className="w-5 h-5" />
            {isChecking ? 'Checking...' : 'Check this product'}
          </Button>
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
        </div>
      </div>

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 style={{ color: 'var(--text-secondary)' }}>Recent checks</h3>
          <div className="space-y-3">
            {results.map((check, idx) => (
              <VerdictCard key={idx} {...check} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
