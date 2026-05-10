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

const organizations = [
  {
    id: 'platform',
    name: 'Marketing SaaS Platform',
    type: 'platform'
  },
  {
    id: 'acme',
    name: 'Acme Growth Co.',
    type: 'company'
  },
  {
    id: 'nova',
    name: 'Nova Retail Group',
    type: 'company'
  }
];

const rolePermissions = {
  super_admin: [
    'إدارة جميع الشركات',
    'إدارة خطط الاشتراك',
    'مراقبة إعدادات المنصة',
    'عرض تقارير النظام العامة'
  ],
  company_admin: [
    'إدارة إعدادات الشركة',
    'دعوة أعضاء الفريق',
    'توزيع الأدوار داخل الشركة',
    'عرض جميع تقارير الشركة'
  ],
  marketing_manager: [
    'إنشاء خطط الحملات',
    'إدارة قنوات التسويق',
    'متابعة مؤشرات الأداء',
    'اعتماد المحتوى قبل النشر'
  ],
  designer: [
    'عرض ملخص الحملات',
    'رفع التصاميم والمواد البصرية',
    'تحديث حالة مهام التصميم'
  ],
  content_writer: [
    'كتابة محتوى الحملات',
    'تعديل النصوص التسويقية',
    'إرسال المحتوى للمراجعة'
  ],
  media_buyer: [
    'إدارة ميزانيات الإعلانات',
    'متابعة أداء القنوات المدفوعة',
    'تحديث نتائج الحملات الإعلانية'
  ],
  accountant: [
    'عرض الفواتير والاشتراكات',
    'متابعة مصروفات الحملات',
    'تصدير ملخصات مالية'
  ],
  client: [
    'عرض حالة الحملات',
    'مراجعة التقارير المشتركة',
    'إرسال ملاحظات على التسليمات'
  ]
};

const dashboardTitles = {
  super_admin: 'لوحة تحكم مدير المنصة',
  company_admin: 'لوحة تحكم مدير الشركة',
  marketing_manager: 'لوحة مدير التسويق',
  designer: 'لوحة المصمم',
  content_writer: 'لوحة كاتب المحتوى',
  media_buyer: 'لوحة مشتري الإعلانات',
  accountant: 'لوحة المحاسب',
  client: 'لوحة العميل'
};

const demoUsers = [
  {
    id: 'user-super-admin',
    name: 'سارة مدير المنصة',
    email: 'super_admin@marketing-saas.local',
    password: 'password',
    role: 'super_admin',
    organizationId: 'platform'
  },
  {
    id: 'user-company-admin',
    name: 'أحمد مدير الشركة',
    email: 'company_admin@marketing-saas.local',
    password: 'password',
    role: 'company_admin',
    organizationId: 'acme'
  },
  {
    id: 'user-marketing-manager',
    name: 'ليلى مديرة التسويق',
    email: 'marketing_manager@marketing-saas.local',
    password: 'password',
    role: 'marketing_manager',
    organizationId: 'acme'
  },
  {
    id: 'user-designer',
    name: 'يوسف المصمم',
    email: 'designer@marketing-saas.local',
    password: 'password',
    role: 'designer',
    organizationId: 'acme'
  },
  {
    id: 'user-content-writer',
    name: 'نور كاتبة المحتوى',
    email: 'content_writer@marketing-saas.local',
    password: 'password',
    role: 'content_writer',
    organizationId: 'acme'
  },
  {
    id: 'user-media-buyer',
    name: 'كريم مشتري الإعلانات',
    email: 'media_buyer@marketing-saas.local',
    password: 'password',
    role: 'media_buyer',
    organizationId: 'nova'
  },
  {
    id: 'user-accountant',
    name: 'ريم المحاسبة',
    email: 'accountant@marketing-saas.local',
    password: 'password',
    role: 'accountant',
    organizationId: 'nova'
  },
  {
    id: 'user-client',
    name: 'ماجد العميل',
    email: 'client@marketing-saas.local',
    password: 'password',
    role: 'client',
    organizationId: 'nova'
  }
];

const campaigns = [
  {
    id: 'email-growth',
    organizationId: 'acme',
    channel: 'Email',
    name: 'نشرة النمو الأسبوعية',
    description: 'حملة بريدية لمتابعة العملاء المحتملين وتحويلهم إلى مشتركين دائمين.',
    conversionRate: 12.8
  },
  {
    id: 'paid-social',
    organizationId: 'acme',
    channel: 'Social Ads',
    name: 'إعلانات إطلاق المنتج',
    description: 'رسائل موحدة عبر الشبكات الاجتماعية لزيادة الوعي بالمنتج الجديد.',
    conversionRate: 8.4
  },
  {
    id: 'retention',
    organizationId: 'nova',
    channel: 'Retention',
    name: 'إعادة تفعيل العملاء',
    description: 'تسلسل رسائل مخصص لإعادة المستخدمين غير النشطين إلى المنصة.',
    conversionRate: 15.2
  }
];

function publicUser(user) {
  const organization = organizations.find((item) => item.id === user.organizationId);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    dashboardPath: `/dashboard/${user.role}`,
    dashboardTitle: dashboardTitles[user.role],
    permissions: rolePermissions[user.role] || [],
    organization: {
      id: organization?.id,
      name: organization?.name,
      type: organization?.type
    }
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'marketing-saas-api' });
});

app.get('/api/auth/demo-users', (_req, res) => {
  res.json(
    demoUsers.map((user) => ({
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      organization: organizations.find((item) => item.id === user.organizationId)?.name
    }))
  );
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'البريد الإلكتروني وكلمة المرور مطلوبان' });
  }

  const user = demoUsers.find(
    (item) => item.email.toLowerCase() === String(email).toLowerCase() && item.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'بيانات الدخول غير صحيحة. استخدم أحد حسابات demo الموجودة في README.' });
  }

  return res.json({
    token: `demo-token-${user.role}`,
    user: publicUser(user)
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
