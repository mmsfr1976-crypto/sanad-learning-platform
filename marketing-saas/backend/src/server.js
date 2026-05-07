import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();
const port = Number(process.env.PORT || 4000);
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: frontendOrigin, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

const campaigns = [
  {
    id: 'email-growth',
    channel: 'Email',
    name: 'نشرة النمو الأسبوعية',
    description: 'حملة بريدية لمتابعة العملاء المحتملين وتحويلهم إلى مشتركين دائمين.',
    conversionRate: 12.8
  },
  {
    id: 'paid-social',
    channel: 'Social Ads',
    name: 'إعلانات إطلاق المنتج',
    description: 'رسائل موحدة عبر الشبكات الاجتماعية لزيادة الوعي بالمنتج الجديد.',
    conversionRate: 8.4
  },
  {
    id: 'retention',
    channel: 'Retention',
    name: 'إعادة تفعيل العملاء',
    description: 'تسلسل رسائل مخصص لإعادة المستخدمين غير النشطين إلى المنصة.',
    conversionRate: 15.2
  }
];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'marketing-saas-api' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'البريد الإلكتروني وكلمة المرور مطلوبان' });
  }

  return res.json({
    token: 'demo-token',
    user: {
      id: 'demo-user',
      name: 'مدير التسويق',
      email
    }
  });
});

app.get('/api/campaigns', (_req, res) => {
  res.json(campaigns);
});

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.listen(port, () => {
  console.log(`Marketing SaaS API is running on http://localhost:${port}`);
});
