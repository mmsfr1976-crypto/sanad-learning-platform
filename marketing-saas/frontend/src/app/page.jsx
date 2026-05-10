import Campaigns from '@/components/campaigns';
import LoginForm from '@/components/login-form';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Marketing SaaS</p>
          <h1>لوحة موحّدة لإدارة شركات التسويق</h1>
          <p>
            سجّل الدخول بحساب تجريبي لترى لوحة تحكم مختلفة حسب الشركة والدور والصلاحيات.
          </p>
        </div>
        <LoginForm />
      </section>
      <Campaigns />
    </main>
  );
}
