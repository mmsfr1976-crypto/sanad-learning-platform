import Campaigns from '@/components/campaigns';
import LoginForm from '@/components/login-form';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Marketing SaaS</p>
          <h1>لوحة موحّدة لإدارة حملات التسويق</h1>
          <p>
            تابع حملات البريد، الإعلانات، وقنوات النمو من واجهة واحدة متصلة بخادم Express.
          </p>
        </div>
        <LoginForm />
      </section>
      <Campaigns />
    </main>
  );
}
