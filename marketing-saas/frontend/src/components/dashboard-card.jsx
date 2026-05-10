'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';

const fallbackTitles = {
  super_admin: 'لوحة تحكم مدير المنصة',
  company_admin: 'لوحة تحكم مدير الشركة',
  marketing_manager: 'لوحة مدير التسويق',
  designer: 'لوحة المصمم',
  content_writer: 'لوحة كاتب المحتوى',
  media_buyer: 'لوحة مشتري الإعلانات',
  accountant: 'لوحة المحاسب',
  client: 'لوحة العميل'
};

export default function DashboardCard() {
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const role = params.role;
  const isCorrectDashboard = user?.role === role;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace('/');
      return;
    }

    if (user?.dashboardPath && !isCorrectDashboard) {
      router.replace(user.dashboardPath);
    }
  }, [isAuthenticated, isCorrectDashboard, isLoading, router, user]);

  if (isLoading || !isAuthenticated || !isCorrectDashboard) {
    return (
      <main>
        <div className="card">
          <p className="muted">جاري تجهيز لوحة التحكم المناسبة...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="dashboard-shell">
        <div className="card dashboard-card">
          <p className="eyebrow">{fallbackTitles[user.role] || user.dashboardTitle}</p>
          <h1>{user.dashboardTitle}</h1>
          <p className="muted">
            هذه صفحة تأسيسية بسيطة لنظام SaaS متعدد الشركات. تعرض بيانات الشركة والمستخدم والدور
            والصلاحيات فقط قبل بناء CRM والحملات والتقارير.
          </p>

          <div className="identity-grid">
            <div>
              <span>الشركة</span>
              <strong>{user.organization.name}</strong>
            </div>
            <div>
              <span>المستخدم</span>
              <strong>{user.name}</strong>
            </div>
            <div>
              <span>الدور</span>
              <strong>{user.role}</strong>
            </div>
          </div>
        </div>

        <div className="card permissions-card">
          <p className="eyebrow">الصلاحيات المتاحة</p>
          <ul className="permissions-list">
            {user.permissions.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
          <div className="dashboard-actions">
            <Link href="/">العودة للصفحة الرئيسية</Link>
            <button type="button" onClick={logout}>
              تسجيل الخروج
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
