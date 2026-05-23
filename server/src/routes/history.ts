import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const history = await prisma.scanHistory.findMany({
    where: { userId: req.userId! },
    include: { product: true },
    orderBy: { scannedAt: 'desc' },
    take: 100,
  });

  const items = history.map(h => ({
    verdict: h.product.verdict as 'Safe' | 'Caution' | 'High Risk',
    productName: h.product.productName,
    store: h.product.store || 'Unknown Store',
    score: h.product.score,
    reasons: h.product.reasons,
    scannedAt: h.scannedAt.toISOString(),
    barcode: h.product.barcode || undefined,
    url: h.product.url || undefined,
  }));

  res.json(items);
});

export default router;
