import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import historyRoutes from './routes/history';
import profileRoutes from './routes/profile';
import reportRoutes from './routes/report';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/report', reportRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
