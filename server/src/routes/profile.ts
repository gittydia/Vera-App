import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId! },
    include: {
      scanHistory: { include: { product: true } },
    },
  });

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const totalScans = user.scanHistory.length;
  const warnings = user.scanHistory.filter(h =>
    h.product.verdict === 'High Risk'
  ).length;

  const initials = user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  res.json({
    name: user.name,
    email: user.email,
    avatarInitials: initials,
    productsScanned: totalScans,
    safetyWarnings: warnings,
  });
});

export default router;
