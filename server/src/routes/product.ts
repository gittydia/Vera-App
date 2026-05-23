import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { scrapeUrl } from '../services/scraper';
import { scoreLinkProduct, scoreBarcodeProduct } from '../services/scoring';
import { authMiddleware } from '../middleware/auth';
import type { ProductDetailResult } from '../types';

const prisma = new PrismaClient();
const router = Router();

const linkSchema = z.object({
  url: z.string().url(),
});

const barcodeSchema = z.object({
  barcode: z.string().min(1),
});

router.post('/check-link', authMiddleware, async (req: Request, res: Response) => {
  const parsed = linkSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid URL', details: parsed.error.flatten() });
    return;
  }

  const { url } = parsed.data;

  const existing = await prisma.product.findUnique({ where: { url } });
  if (existing) {
    await prisma.scanHistory.create({
      data: { userId: req.userId!, productId: existing.id },
    });

    const result: ProductDetailResult = {
      verdict: existing.verdict as 'Safe' | 'Caution' | 'High Risk',
      productName: existing.productName,
      store: existing.store || 'Online Store',
      score: existing.score,
      reasons: existing.reasons,
      url: existing.url || undefined,
    };

    res.json(result);
    return;
  }

  const scraped = await scrapeUrl(url);
  const scored = scoreLinkProduct(scraped.title, scraped.description, url);

  const product = await prisma.product.create({
    data: {
      url,
      productName: scored.productName,
      store: scored.store,
      verdict: scored.verdict,
      score: scored.score,
      reasons: scored.reasons,
    },
  });

  await prisma.scanHistory.create({
    data: { userId: req.userId!, productId: product.id },
  });

  const result: ProductDetailResult = {
    ...scored,
    url,
  };

  res.json(result);
});

router.post('/check-barcode', authMiddleware, async (req: Request, res: Response) => {
  const parsed = barcodeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid barcode', details: parsed.error.flatten() });
    return;
  }

  const { barcode } = parsed.data;

  const existing = await prisma.product.findUnique({ where: { barcode } });
  const blacklisted = await prisma.blacklistedBarcode.findUnique({ where: { barcode } });
  const isBlacklisted = !!blacklisted;

  const existingData = existing
    ? { productName: existing.productName, store: existing.store, score: existing.score, verdict: existing.verdict, reasons: existing.reasons }
    : null;

  const scored = scoreBarcodeProduct(barcode, isBlacklisted, existingData);

  if (!existing) {
    const product = await prisma.product.create({
      data: {
        barcode,
        productName: scored.productName,
        store: scored.store,
        verdict: scored.verdict,
        score: scored.score,
        reasons: scored.reasons,
      },
    });

    await prisma.scanHistory.create({
      data: { userId: req.userId!, productId: product.id },
    });
  } else {
    if (isBlacklisted && existing.verdict !== 'High Risk') {
      await prisma.product.update({
        where: { id: existing.id },
        data: { verdict: 'High Risk', score: 40, reasons: scored.reasons },
      });
    }

    await prisma.scanHistory.create({
      data: { userId: req.userId!, productId: existing.id },
    });
  }

  const result: ProductDetailResult = {
    ...scored,
    barcode,
  };

  res.json(result);
});

export default router;
