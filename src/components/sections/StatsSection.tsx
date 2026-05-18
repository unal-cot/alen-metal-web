const stats = [
  { value: "500+", label: "Tamamlanan Proje" },
  { value: "10+", label: "Yıllık Tecrübe" },
  { value: "1000+", label: "Mutlu Müşteri" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-surface border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-around items-center gap-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-stat-number text-stat-number text-primary-container mb-2">
                {s.value}
              </div>
              <div className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
