import { useState, useEffect, useCallback } from 'react';
import { Barcode, QrCode, Scan, Camera } from 'lucide-react';
import { VerdictCard } from './VerdictCard';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { api, type VerdictItem } from '../../lib/api';

export function Scanner() {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [lastResult, setLastResult] = useState<VerdictItem | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = useCallback(async (barcode: string) => {
    if (!barcode.trim()) return;
    setIsScanning(true);
    setError('');
    try {
      const result = await api.checkBarcode(barcode);
      setLastResult(result);
      setBarcodeInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed');
    } finally {
      setIsScanning(false);
    }
  }, []);

  const openScanner = useCallback(() => {
    setShowScanner(true);
  }, []);

  const closeScanner = useCallback(() => {
    setShowScanner(false);
  }, []);

  const onScanSuccess = useCallback((decodedText: string) => {
    setBarcodeInput(decodedText);
    setShowScanner(false);
    handleScan(decodedText);
  }, [handleScan]);

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
          {showScanner ? (
            <CameraScanner onScan={onScanSuccess} onClose={closeScanner} />
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="Enter barcode number..."
                  className="pr-20"
                  onKeyDown={(e) => e.key === 'Enter' && handleScan(barcodeInput)}
                />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" size="lg" onClick={() => handleScan(barcodeInput)} disabled={isScanning || !barcodeInput.trim()}>
                  <Scan className="w-5 h-5" />
                  {isScanning ? 'Checking...' : 'Check Barcode'}
                </Button>
                <Button variant="outline" size="lg" onClick={openScanner} disabled={isScanning}>
                  <Camera className="w-5 h-5" />
                  Camera
                </Button>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
            </div>
          )}

          {!showScanner && (
            <>
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
            </>
          )}
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

function CameraScanner({ onScan, onClose }: { onScan: (text: string) => void; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    let scanner: any = null;

    (async () => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        if (cancelled) return;

        scanner = new Html5Qrcode('camera-reader');
        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 150 } },
          (decodedText: string) => {
            if (cancelled) return;
            scanner.stop().catch(() => {});
            scanner.clear();
            onScan(decodedText);
          },
          () => {}
        );

        if (!cancelled) setLoading(false);
      } catch (e: any) {
        if (cancelled) return;
        const msg = typeof e === 'string' ? e : e?.message ?? 'Unknown error';
        if (msg.includes('NotAllowedError') || msg.includes('Permission')) {
          setErr('Camera permission denied. Please allow camera access in your browser settings and try again.');
        } else if (msg.includes('NotFoundError')) {
          setErr('No camera found on this device.');
        } else {
          setErr('Camera error: ' + msg);
        }
      }
    })();

    return () => {
      cancelled = true;
      if (scanner) {
        scanner.stop().catch(() => {});
        scanner.clear();
      }
    };
  }, [onScan]);

  return (
    <div className="space-y-4">
      {err ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <p className="text-sm text-red-500 text-center">{err}</p>
          <Button variant="outline" size="lg" onClick={onClose}>
            <Camera className="w-5 h-5" />
            Close
          </Button>
        </div>
      ) : (
        <>
          <div id="camera-reader" className="w-full aspect-video rounded-xl overflow-hidden bg-black" />
          {loading && <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>Starting camera...</p>}
          <Button variant="outline" className="w-full" size="lg" onClick={onClose}>
            <Camera className="w-5 h-5" />
            Cancel
          </Button>
        </>
      )}
    </div>
  );
}
