# Vera API Documentation

Base URL: `http://localhost:3001/api`

## Authentication

All endpoints except `/auth/signup` and `/auth/login` require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are obtained from signup/login and expire after 7 days.

---

## Endpoints

### POST /api/auth/signup

Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "avatarInitials": "JD"
  }
}
```

**Errors:** `400` validation, `409` email already registered.

---

### POST /api/auth/login

Authenticate an existing user.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "avatarInitials": "JD"
  }
}
```

**Errors:** `400` validation, `401` invalid credentials.

---

### POST /api/check-link

Check a product URL for safety. Scrapes the page title/description, runs FDA registration regex and keyword blacklist checks, and returns a verdict.

**Request:**
```json
{
  "url": "https://shopee.ph/product/123"
}
```

**Response (200):**
```json
{
  "verdict": "Safe",
  "productName": "Organic Multivitamin Complex",
  "store": "Shopee",
  "score": 87,
  "reasons": [
    "FDA registration found: FR-123456",
    "Product appears to meet safety guidelines"
  ]
}
```

**Verdict values:** `"Safe"` (score ≥ 80), `"Caution"` (40 < score < 80), `"High Risk"` (score ≤ 40).

**Scoring logic:** `Score = (F × 0.50) + (N × 0.50)` where:
- F = 100 if valid FDA format found (`FR-XXXXXX`, `NN-XXXXXX`, `DR-XXXXXX`), else 0
- N = 100 minus 15 per high-risk keyword, minus 10 per moderate-risk keyword
- If F = 0, score is hard-capped at 40 (High Risk)

**Errors:** `400` invalid URL.

---

### POST /api/check-barcode

Check a product barcode (EAN-13, UPC-A, QR) for safety.

**Request:**
```json
{
  "barcode": "8901234567890"
}
```

**Response (200):**
```json
{
  "verdict": "Caution",
  "productName": "Product (8901234567890)",
  "store": "Unknown Store",
  "score": 50,
  "reasons": [
    "No safety data available for this barcode yet",
    "Product has not been verified by our system",
    "Check the packaging for FDA registration details"
  ]
}
```

**Scoring logic:**
- Barcode found in DB with previous verdict → returns that verdict
- Barcode in blacklist → High Risk (40)
- No record → Caution (50)

**Errors:** `400` invalid barcode.

---

### GET /api/history

Get the authenticated user's scan history (last 100 items).

**Response (200):**
```json
[
  {
    "verdict": "Safe",
    "productName": "Organic Multivitamin Complex",
    "store": "Shopee",
    "score": 87,
    "reasons": ["..."],
    "scannedAt": "2026-05-23T12:00:00.000Z",
    "barcode": "8901234567890",
    "url": "https://shopee.ph/product/123"
  }
]
```

---

### GET /api/profile

Get the authenticated user's profile and statistics.

**Response (200):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "avatarInitials": "JD",
  "productsScanned": 42,
  "safetyWarnings": 3
}
```

---

### POST /api/report

Report a product as suspicious. If a barcode is provided, it also gets added to the blacklist.

**Request:**
```json
{
  "productId": "uuid-here",
  "barcode": "8901234567890",
  "url": "https://shopee.ph/product/123",
  "reason": "Product appears to be counterfeit - no FDA registration on packaging"
}
```

Provide at least one of: `productId`, `barcode`, or `url`.

**Response (200):**
```json
{
  "success": true,
  "message": "Report submitted. Thank you for helping keep our community safe."
}
```

**Errors:** `400` validation (reason must be 10-1000 chars), `404` product not found.

---

### GET /api/health

Health check endpoint.

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2026-05-23T12:00:00.000Z"
}
```

---

## Data Types

### Verdict
```typescript
type Verdict = 'Safe' | 'Caution' | 'High Risk';
```

### VerdictItem
```typescript
interface VerdictItem {
  verdict: Verdict;
  productName: string;
  store: string;
  score: number;     // 0-100
  reasons: string[]; // 1-5 bullet points
  scannedAt?: string; // ISO 8601
  barcode?: string;
  url?: string;
}
```

### Score → UI Mapping
| Score | Verdict | Color |
|-------|---------|-------|
| ≥ 80 | Safe | Green (#22C55E) |
| 41-79 | Caution | Amber (#F59E0B) |
| ≤ 40 | High Risk | Red (#EF4444) |

---

## FDA Registration Formats (Philippines)
- `FR-XXXXXX` — Food Registration
- `NN-XXXXXX` — Notification Number
- `DR-XXXXXX` — Drug Registration

---

## High-Risk Keywords
Scanned against product title and description in link auditor mode. High-risk keywords (15pt penalty each):
`cure cancer`, `instant whitening`, `miracle cure`, `magical results`, `guaranteed cure`, `no side effects`, `quick fix`, `overnight results`, `secret formula`, `miracle pill`, `weight loss miracle`, `detox magic`, `proven cure`, `immediate results`, `100% guaranteed`, `permanent cure`, `cure-all`, `reverses aging`, `ultimate solution`, `breakthrough`, `clinically proven`, `miraculous`, `instant results`, `super fast`

Moderate-risk keywords (10pt penalty each):
`whitening`, `skin lightening`, `fast weight loss`, `extreme`, `unlimited`, `powerful`, `intense`, `herbal remedy`, `natural cure`
