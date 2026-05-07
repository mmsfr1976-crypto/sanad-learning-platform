'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function LoginForm() {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const [email, setEmail] = useState('demo@marketing-saas.local');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return <p className="muted">جاري تحميل حالة الدخول...</p>;
  }

  if (isAuthenticated) {
    return (
      <div className="card success-card">
        <p className="eyebrow">جلسة نشطة</p>
        <h2>مرحباً {user.name}</h2>
        <p>يمكنك الآن إدارة الحملات ولوحات التسويق من الواجهة.</p>
        <button type="button" onClick={logout}>
          تسجيل الخروج
        </button>
      </div>
    );
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <p className="eyebrow">تسجيل دخول تجريبي</p>
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
        {submitting ? 'جاري الدخول...' : 'دخول'}
      </button>
    </form>
  );
}
