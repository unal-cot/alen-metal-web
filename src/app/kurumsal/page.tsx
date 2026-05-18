import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function KurumsalPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-display-lg text-display-lg text-primary-container mb-4">Kurumsal</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl">
            ALEN METAL olarak, metal sektöründe yılların getirdiği tecrübe ile güvenlik ve dayanıklılıkta kalite standardını belirliyoruz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-20">
            <GlassPanel>
              <span className="material-symbols-outlined text-4xl text-primary-container mb-4">visibility</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">Misyonumuz</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Müşterilerimize en kaliteli metal ürünlerini ve güvenlik çözümlerini sunarak, yaşam alanlarını daha güvenli ve estetik hale getirmek. Teknoloji ve işçiliği birleştirerek sektörde öncü olmak.
              </p>
            </GlassPanel>
            <GlassPanel>
              <span className="material-symbols-outlined text-4xl text-primary-container mb-4">flag</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">Vizyonumuz</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Türkiye&apos;nin lider metal ve güvenlik sistemleri markası olarak, uluslararası standartlarda üretim yapmak ve global pazarda söz sahibi olmak. Sürdürülebilir büyüme ile sektöre yön vermek.
              </p>
            </GlassPanel>
          </div>

          <h2 className="font-headline-xl text-headline-xl text-primary-container mb-8 text-center">Neden Biz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-20">
            {[
              { icon: "handshake", title: "Güvenilir Hizmet", desc: "Yılların verdiği tecrübe ve müşteri memnuniyeti odaklı çalışma prensibimizle güvenilir hizmet sunuyoruz." },
              { icon: "star", title: "Kaliteli Malzeme", desc: "En kaliteli hammadde ve modern üretim teknikleri ile uzun ömürlü ürünler üretiyoruz." },
              { icon: "bolt", title: "Hızlı Teslimat", desc: "Profesyonel ekibimiz ve organize çalışma sistemimizle projelerinizi zamanında teslim ediyoruz." },
            ].map((item) => (
              <GlassPanel key={item.title} className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary-container mb-4">{item.icon}</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{item.desc}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
