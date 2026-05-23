import { useState } from 'react';
import { Barcode, QrCode, Scan } from 'lucide-react';
import { VerdictCard } from './VerdictCard';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { api, type VerdictItem } from '../../lib/api';

export function Scanner() {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [lastResult, setLastResult] = useState<VerdictItem | null>(null);

  const handleScan = async () => {
    if (!barcodeInput.trim()) return;
    setIsScanning(true);
    setError('');
    try {
      const result = await api.checkBarcode(barcodeInput);
      setLastResult(result);
      setBarcodeInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
        <div className="space-y-2">
          <Badge>QR & Barcode Scanner</Badge>
          <h1 className="text-2xl leading-tight">
            Scan any product<br />for instant verdict
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Enter or scan a barcode to verify safety</p>
        </div>

        <div className="relative rounded-2xl p-6 overflow-hidden" style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)'
        }}>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                placeholder="Enter barcode number..."
                className="pr-20"
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              />
            </div>

            <Button className="w-full" size="lg" onClick={handleScan} disabled={isScanning || !barcodeInput.trim()}>
              <Scan className="w-5 h-5" />
              {isScanning ? 'Checking...' : 'Check Barcode'}
            </Button>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </div>

          <p className="text-center text-sm mt-4" style={{ color: 'var(--text-tertiary)' }}>
            Supports EAN-13, UPC-A, QR codes
          </p>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)'
            }}>
              <Barcode className="w-6 h-6 text-[#7C3AED]" />
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)'
            }}>
              <QrCode className="w-6 h-6 text-[#7C3AED]" />
            </div>
          </div>
        </div>

        {lastResult && (
          <div className="space-y-3">
            <h3 style={{ color: 'var(--text-secondary)' }}>Last scanned</h3>
            <VerdictCard {...lastResult} />
          </div>
        )}
    </div>
  );
}
