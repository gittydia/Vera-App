import { X, Share2, Flag, CheckCircle2, AlertTriangle, XCircle, Shield, Beaker, Award } from 'lucide-react';
import { VerdictBadge } from './VerdictBadge';
import { ScoreBar } from './ScoreBar';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  verdict: 'Safe' | 'Caution' | 'High Risk';
  productName: string;
  store: string;
  score: number;
  reasons: string[];
}

export function ProductDetail({
  isOpen,
  onClose,
  verdict,
  productName,
  store,
  score,
  reasons
}: ProductDetailProps) {
  if (!isOpen) return null;

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

  const verdictIcons = {
    safe: CheckCircle2,
    caution: AlertTriangle,
    danger: XCircle
  };

  const Icon = verdictIcons[type];

  // Mock detailed data
  const ingredients = [
    { name: 'Vitamin D3', status: 'verified', note: 'Cholecalciferol - 2000 IU' },
    { name: 'Vitamin B12', status: 'verified', note: 'Methylcobalamin - 1000 mcg' },
    { name: 'Omega-3 Fatty Acids', status: 'verified', note: 'EPA & DHA from fish oil' },
    { name: 'Calcium Carbonate', status: type === 'safe' ? 'verified' : 'warning', note: '500 mg per serving' }
  ];

  const certifications = [
    { name: 'FDA Approved', verified: score > 60 },
    { name: 'GMP Certified', verified: score > 70 },
    { name: 'Third-Party Tested', verified: score > 50 },
    { name: 'Non-GMO', verified: score > 80 }
  ];

  const reviews = [
    { user: 'Sarah M.', rating: 5, comment: 'Great quality product, noticed improvements within weeks.' },
    { user: 'John D.', rating: 4, comment: 'Good value for money. Packaging could be better.' },
    { user: 'Emma L.', rating: type === 'safe' ? 5 : 2, comment: type === 'safe' ? 'Highly recommend!' : 'Had some concerns about ingredients.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b" style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-color)'
        }}>
          <h2 className="text-xl font-medium">Product Details</h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Header */}
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <Shield className="w-12 h-12" style={{ color: verdictColors[type] }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <VerdictBadge type={type} />
                <span style={{ color: verdictColors[type] }} className="font-medium">{verdict}</span>
              </div>
              <h3 className="text-xl font-medium mb-1">{productName}</h3>
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm">Sold by {store}</p>
            </div>
          </div>

          {/* Score */}
          <Card>
            <CardContent className="p-4">
              <ScoreBar score={score} type={type} />
              <div className="mt-4 flex items-center gap-2">
                <Icon className="w-5 h-5" style={{ color: verdictColors[type] }} />
                <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                  {score > 80 ? 'Highly trusted product' : score > 60 ? 'Generally safe with minor concerns' : 'Exercise caution'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Key Findings */}
          <div>
            <h4 className="font-medium mb-3">Key Findings</h4>
            <div className="space-y-2">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: verdictColors[type] }}
                  />
                  <span className="text-sm">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Ingredients */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Beaker className="w-5 h-5 text-[#7C3AED]" />
              <h4 className="font-medium">Ingredients Analysis</h4>
            </div>
            <div className="space-y-2">
              {ingredients.map((ingredient, idx) => (
                <Card key={idx}>
                  <CardContent className="p-3 flex items-start justify-between">
                    <div>
                      <div className="font-medium text-sm mb-1">{ingredient.name}</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{ingredient.note}</div>
                    </div>
                    <Badge variant={ingredient.status === 'verified' ? 'default' : 'secondary'} className="text-xs">
                      {ingredient.status === 'verified' ? '✓ Verified' : '⚠ Check'}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-[#7C3AED]" />
              <h4 className="font-medium">Certifications</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg flex items-center gap-2"
                  style={{ backgroundColor: cert.verified ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-secondary)' }}
                >
                  {cert.verified ? (
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
                  )}
                  <span className="text-sm">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* User Reviews */}
          <div>
            <h4 className="font-medium mb-3">Community Reviews</h4>
            <div className="space-y-3">
              {reviews.map((review, idx) => (
                <Card key={idx}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{review.user}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-[#F59E0B]' : 'text-gray-400'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" className="flex-1">
              <Flag className="w-4 h-4" />
              Report Issue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
