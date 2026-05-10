'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

const demoRoles = [
  { role: 'super_admin', email: 'super_admin@marketing-saas.local' },
  { role: 'company_admin', email: 'company_admin@marketing-saas.local' },
  { role: 'marketing_manager', email: 'marketing_manager@marketing-saas.local' },
  { role: 'designer', email: 'designer@marketing-saas.local' },
  { role: 'content_writer', email: 'content_writer@marketing-saas.local' },
  { role: 'media_buyer', email: 'media_buyer@marketing-saas.local' },
  { role: 'accountant', email: 'accountant@marketing-saas.local' },
  { role: 'client', email: 'client@marketing-saas.local' }
];

export default function LoginForm() {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('marketing_manager@marketing-saas.local');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const loggedInUser = await login({ email, password });
      router.push(loggedInUser.dashboardPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function selectDemoUser(selectedEmail) {
    setEmail(selectedEmail);
    setPassword('password');
  }

  if (isLoading) {
    return <p className="muted">جاري تحميل حالة الدخول...</p>;
  }

  if (isAuthenticated) {
    return (
      <div className="card success-card">
        <p className="eyebrow">جلسة نشطة</p>
        <h2>مرحباً {user.name}</h2>
        <p>
          أنت داخل شركة {user.organization.name} بدور <strong>{user.role}</strong>.
        </p>
        <div className="button-row">
          <button type="button" onClick={() => router.push(user.dashboardPath)}>
            فتح لوحة التحكم
          </button>
          <button type="button" className="secondary-button" onClick={logout}>
            تسجيل الخروج
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <p className="eyebrow">تسجيل دخول تجريبي حسب الدور</p>
      <label>
        اختر دوراً تجريبياً
        <select value={email} onChange={(event) => selectDemoUser(event.target.value)}>
          {demoRoles.map((item) => (
            <option value={item.email} key={item.role}>
              {item.role}
            </option>
          ))}
        </select>
      </label>
      <label>
        البريد الإلكتروني
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
      </label>
      <label>
        كلمة المرور
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button disabled={submitting} type="submit">
        {submitting ? 'جاري الدخول...' : 'دخول للوحة الدور'}
      </button>
    </form>
  );
}
