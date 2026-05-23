const API_BASE = 'http://localhost:3001/api';

function getToken(): string | null {
  return localStorage.getItem('vera-token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export interface AuthResponse {
  token: string;
  user: {
    name: string;
    email: string;
    avatarInitials: string;
  };
}

export interface VerdictItem {
  verdict: 'Safe' | 'Caution' | 'High Risk';
  productName: string;
  store: string;
  score: number;
  reasons: string[];
  scannedAt?: string;
  barcode?: string;
  url?: string;
}

export interface ProfileResponse {
  name: string;
  email: string;
  avatarInitials: string;
  productsScanned: number;
  safetyWarnings: number;
}

export const api = {
  signup(name: string, email: string, password: string) {
    return request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  login(email: string, password: string) {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  checkLink(url: string) {
    return request<VerdictItem>('/check-link', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
  },

  checkBarcode(barcode: string) {
    return request<VerdictItem>('/check-barcode', {
      method: 'POST',
      body: JSON.stringify({ barcode }),
    });
  },

  getHistory() {
    return request<VerdictItem[]>('/history');
  },

  getProfile() {
    return request<ProfileResponse>('/profile');
  },

  report(data: { productId?: string; barcode?: string; url?: string; reason: string }) {
    return request<{ success: boolean; message: string }>('/report', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
