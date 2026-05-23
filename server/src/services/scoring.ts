import type { Verdict, VerdictResult } from '../types';

const FDA_REGEX = /(?:FR|NN|DR)-\d{6,}/gi;

const HIGH_RISK_KEYWORDS = [
  'cure cancer', 'instant whitening', 'miracle cure', 'magical results',
  'guaranteed cure', 'no side effects', 'quick fix', 'overnight results',
  'secret formula', 'miracle pill', 'weight loss miracle', 'detox magic',
  'proven cure', 'immediate results', '100% guaranteed', 'permanent cure',
  'cure-all', 'reverses aging', 'ultimate solution', 'breakthrough',
  'clinically proven', 'miraculous', 'instant results', 'super fast',
];

const MODERATE_RISK_KEYWORDS = [
  'whitening', 'skin lightening', 'fast weight loss', 'extreme',
  'unlimited', 'powerful', 'intense', 'herbal remedy', 'natural cure',
];

export function scoreLinkProduct(title: string, description: string, url?: string): VerdictResult {
  const text = `${title} ${description} ${url || ''}`.toLowerCase();

  const hasFDA = FDA_REGEX.test(text);
  const fdaMatches = text.match(FDA_REGEX);

  const highRiskMatches = HIGH_RISK_KEYWORDS.filter(k => text.includes(k));
  const moderateRiskMatches = MODERATE_RISK_KEYWORDS.filter(k => text.includes(k));

  const F = hasFDA ? 100 : 0;
  const penalty = highRiskMatches.length * 15 + moderateRiskMatches.length * 10;
  const N = Math.max(0, 100 - penalty);
  const score = Math.round((F * 0.5) + (N * 0.5));

  let finalScore: number;
  let verdict: Verdict;
  const reasons: string[] = [];

  if (F === 0) {
    finalScore = Math.min(score, 40);
    verdict = 'High Risk';
    reasons.push('No FDA registration number found');
  } else {
    finalScore = score;
    if (finalScore >= 80) {
      verdict = 'Safe';
    } else if (finalScore > 40) {
      verdict = 'Caution';
    } else {
      verdict = 'High Risk';
    }

    if (fdaMatches) {
      reasons.push(`FDA registration found: ${fdaMatches[0].toUpperCase()}`);
    }
  }

  highRiskMatches.forEach(k => reasons.push(`High-risk claim detected: "${k}"`));
  moderateRiskMatches.forEach(k => reasons.push(`Suspicious claim: "${k}"`));

  if (reasons.length === 0 && verdict === 'Safe') {
    reasons.push('Product appears to meet safety guidelines');
  }

  if (verdict === 'Safe' && hasFDA) {
    reasons.push('Registered product with good safety profile');
  }

  const productName = title.trim()
    || (url ? extractNameFromUrl(url) : '')
    || 'Unknown Product';

  return {
    verdict,
    productName,
    store: extractStore(text),
    score: finalScore,
    reasons: reasons.slice(0, 5),
  };
}

export function scoreBarcodeProduct(
  barcode: string,
  isBlacklisted: boolean,
  existingProduct?: { productName: string; store: string | null; score: number; verdict: string; reasons: string[] } | null
): VerdictResult {
  if (isBlacklisted) {
    return {
      verdict: 'High Risk',
      productName: existingProduct?.productName || `Product (${barcode})`,
      store: existingProduct?.store || 'Unknown Store',
      score: 40,
      reasons: [
        'This barcode has been reported as high risk',
        'Product may be counterfeit or unregistered',
        'Avoid purchasing this product',
      ],
    };
  }

  if (existingProduct) {
    return {
      verdict: existingProduct.verdict as Verdict,
      productName: existingProduct.productName,
      store: existingProduct.store || 'Unknown Store',
      score: existingProduct.score,
      reasons: existingProduct.reasons,
    };
  }

  return {
    verdict: 'Caution',
    productName: `Product (${barcode})`,
    store: 'Unknown Store',
    score: 50,
    reasons: [
      'No safety data available for this barcode yet',
      'Product has not been verified by our system',
      'Check the packaging for FDA registration details',
    ],
  };
}

function extractNameFromUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname
      .replace(/\/[a-z]{2}-[a-z]{2}\//, '/')
      .split('/')
      .filter(Boolean);
    const last = path[path.length - 1];
    if (last) {
      return last
        .replace(/[-_]/g, ' ')
        .replace(/\.(html?|php|asp)$/i, '')
        .replace(/\b\w/g, c => c.toUpperCase());
    }
  } catch {}
  return '';
}

function extractStore(text: string): string {
  const domains = [
    { pattern: /shopee\.ph/gi, name: 'Shopee' },
    { pattern: /lazada\.com\.ph/gi, name: 'Lazada' },
    { pattern: /tiktok\.com/gi, name: 'TikTok Shop' },
    { pattern: /amazon/gi, name: 'Amazon' },
    { pattern: /watsons/gi, name: 'Watsons' },
    { pattern: /mercury\s*drug/gi, name: 'Mercury Drug' },
  ];

  for (const d of domains) {
    if (d.pattern.test(text)) return d.name;
  }

  return 'Online Store';
}
