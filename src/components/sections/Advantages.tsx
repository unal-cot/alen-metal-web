const advantages = [
  { icon: "shield", label: "Güvenli Çözümler" },
  { icon: "verified", label: "Kaliteli Malzeme" },
  { icon: "engineering", label: "Profesyonel Ekip" },
  { icon: "schedule", label: "Zamanında Teslimat" },
  { icon: "payments", label: "Uygun Fiyat Garantisi" },
  { icon: "support_agent", label: "7/24 Destek" },
];

export function Advantages() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
          {advantages.map((a) => (
            <div
              key={a.icon}
              className="glass-panel p-6 rounded-lg flex flex-col items-center text-center hover:-translate-y-1 transition-transform"
            >
              <span
                className="material-symbols-outlined text-4xl text-primary-container mb-4"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {a.icon}
              </span>
              <h3 className="font-label-bold text-label-bold text-on-surface">{a.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
