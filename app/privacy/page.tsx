export default function PrivacyPage() {
  return (
    <main className="min-h-[calc(100vh-108px)] px-6 py-14 md:py-20">
      <section className="mx-auto w-full max-w-4xl rounded-2xl border-4 border-zinc-950 bg-white p-6 shadow-[0_4px_0_0_#09090b] md:p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">Privacy</h1>

        <div className="mt-6 grid gap-5 text-base leading-relaxed text-zinc-700">
          <p>
            This site uses Google Analytics 4 (GA4) to understand aggregate website usage and improve content quality.
          </p>

          <p>
            Data tracked includes page visits, approximate location (country/city), device/browser type, and traffic source.
            We do not set custom personal user identifiers for analytics.
          </p>

          <p>
            Analytics data is used only for traffic insights and content decisions. If you prefer, you can limit tracking
            with browser privacy settings, content blockers, or analytics opt-out browser add-ons.
          </p>
        </div>
      </section>
    </main>
  );
}
