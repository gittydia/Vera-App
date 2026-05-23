import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

const reportSchema = z.object({
  productId: z.string().uuid().optional(),
  barcode: z.string().optional(),
  url: z.string().url().optional(),
  reason: z.string().min(10).max(1000),
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const parsed = reportSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() });
    return;
  }

  const { productId, barcode, url, reason } = parsed.data;

  let targetProductId = productId;

  if (!targetProductId && barcode) {
    const product = await prisma.product.findUnique({ where: { barcode } });
    if (product) targetProductId = product.id;
  }

  if (!targetProductId && url) {
    const product = await prisma.product.findUnique({ where: { url } });
    if (product) targetProductId = product.id;
  }

  if (!targetProductId) {
    res.status(404).json({ error: 'Product not found. Include productId, barcode, or url.' });
    return;
  }

  await prisma.report.create({
    data: {
      userId: req.userId!,
      productId: targetProductId,
      reason,
    },
  });

  if (barcode) {
    await prisma.blacklistedBarcode.upsert({
      where: { barcode },
      update: { reason },
      create: { barcode, reason },
    });
  }

  res.json({ success: true, message: 'Report submitted. Thank you for helping keep our community safe.' });
});

export default router;
