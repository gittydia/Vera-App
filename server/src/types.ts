export type Verdict = 'Safe' | 'Caution' | 'High Risk';

export interface VerdictResult {
  verdict: Verdict;
  productName: string;
  store: string;
  score: number;
  reasons: string[];
}

export interface ProductDetailResult extends VerdictResult {
  barcode?: string;
  url?: string;
  ingredients?: { name: string; status: 'verified' | 'warning'; note: string }[];
  certifications?: { name: string; verified: boolean }[];
  reviews?: { user: string; rating: number; comment: string }[];
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
