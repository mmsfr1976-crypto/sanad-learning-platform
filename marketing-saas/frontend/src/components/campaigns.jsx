import { apiFetch } from '@/lib/api';

export default async function Campaigns() {
  const campaigns = await apiFetch('/api/campaigns', { cache: 'no-store' });

  return (
    <section className="campaigns">
      {campaigns.map((campaign) => (
        <article className="card" key={campaign.id}>
          <p className="eyebrow">{campaign.channel}</p>
          <h3>{campaign.name}</h3>
          <p>{campaign.description}</p>
          <strong>{campaign.conversionRate}% conversion</strong>
        </article>
      ))}
    </section>
  );
}
