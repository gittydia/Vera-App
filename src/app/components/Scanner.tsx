import { Barcode, QrCode } from 'lucide-react';
import { StatusPill } from './StatusPill';
import { VerdictCard } from './VerdictCard';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export function Scanner() {
  return (
    <div className="space-y-6">
        <div className="space-y-2">
          <Badge>QR & Barcode Scanner</Badge>
          <h1 className="text-2xl leading-tight">
            Scan any product<br />for instant verdict
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Point your camera at the barcode or QR code</p>
        </div>

        <div className="relative rounded-2xl p-6 overflow-hidden" style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)'
        }}>
          <div className="relative aspect-square max-w-sm mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <Barcode className="w-8 h-8 text-[#7C3AED]" />
                </div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Camera viewfinder</p>
              </div>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <rect
                x="10%"
                y="10%"
                width="80%"
                height="80%"
                fill="none"
                stroke="#7C3AED"
                strokeWidth="3"
                strokeDasharray="40 200"
                strokeDashoffset="0"
                rx="12"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="240"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>

            <div className="absolute top-[10%] left-[10%] w-8 h-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#7C3AED] rounded" />
              <div className="absolute top-0 left-0 h-full w-1 bg-[#7C3AED] rounded" />
            </div>
            <div className="absolute top-[10%] right-[10%] w-8 h-8">
              <div className="absolute top-0 right-0 w-full h-1 bg-[#7C3AED] rounded" />
              <div className="absolute top-0 right-0 h-full w-1 bg-[#7C3AED] rounded" />
            </div>
            <div className="absolute bottom-[10%] left-[10%] w-8 h-8">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#7C3AED] rounded" />
              <div className="absolute bottom-0 left-0 h-full w-1 bg-[#7C3AED] rounded" />
            </div>
            <div className="absolute bottom-[10%] right-[10%] w-8 h-8">
              <div className="absolute bottom-0 right-0 w-full h-1 bg-[#7C3AED] rounded" />
              <div className="absolute bottom-0 right-0 h-full w-1 bg-[#7C3AED] rounded" />
            </div>

            <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-0.5 bg-[#7C3AED] opacity-60 animate-[scanLine_2s_ease-in-out_infinite]" />
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

        <div className="space-y-3">
          <h3 style={{ color: 'var(--text-secondary)' }}>Last scanned</h3>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <code className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>8901234567890</code>
                <StatusPill type="caution" label="Caution" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Report this barcode
              </Button>
            </CardContent>
          </Card>

          <VerdictCard
            verdict="Safe"
            productName="Certified Protein Powder"
            store="GNC"
            score={92}
            reasons={[
              'NSF Certified for Sport',
              'No banned substances',
              'Verified manufacturing standards'
            ]}
          />
        </div>
    </div>
  );
}
