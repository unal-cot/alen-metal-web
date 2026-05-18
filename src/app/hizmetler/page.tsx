import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GlassPanel } from "@/components/ui/GlassPanel";

const services = [
  {
    title: "Tel Çit Sistemleri",
    icon: "fence",
    desc: "Dayanıklı ve uzun ömürlü tel çit sistemleri ile alanlarınızı güvence altına alıyoruz. Galvanizli ve PVC kaplamalı seçeneklerimizle her türlü arazi ve iklim koşuluna uygun çözümler sunuyoruz.",
    features: ["Yüksek dayanıklılık", "Korozyon direnci", "Kolay montaj", "Ekonomik fiyat"],
  },
  {
    title: "Panel Çit Sistemleri",
    icon: "grid_on",
    desc: "Estetik ve sağlam panel çit sistemleri ile güvenliği en üst seviyeye çıkarıyoruz. Modern tasarımı ve üstün mukavemetiyle panel çitlerimiz, endüstriyel tesislerden toplu konut projelerine kadar geniş bir kullanım alanına sahiptir.",
    features: ["Modern estetik", "Yüksek güvenlik", "Uzun ömür", "Bakım gerektirmez"],
  },
  {
    title: "Çim Çit Sistemleri",
    icon: "grass",
    desc: "Doğal görünüm sunan çim çit sistemleri ile estetik ve mahremiyet sağlar. Çevre dostu malzemelerden üretilen çim çitlerimiz, bahçe ve peyzaj alanlarında doğal bir görünüm elde etmenizi sağlar.",
    features: ["Doğal görünüm", "Mahremiyet", "Çevre dostu", "Kolay bakım"],
  },
  {
    title: "Otomatik Kapı Sistemleri",
    icon: "door_sliding",
    desc: "Son teknoloji otomatik kapı sistemlerimizle güvenlik ve konforu bir arada sunuyoruz. Kayar kapı, bahçe kapısı ve endüstriyel kapı çözümlerimizle ihtiyacınıza uygun otomasyon sağlıyoruz.",
    features: ["Uzaktan kumanda", "Fotosel güvenlik", "Sessiz çalışma", "Acil durum manuel açma"],
  },
  {
    title: "Dekoratif Metal Ürünleri",
    icon: "architecture",
    desc: "El işçiliği ve modern üretim tekniklerini birleştirerek benzersiz dekoratif metal ürünler tasarlıyoruz. Korkuluk, balkon ve merdiven sistemlerinde estetik ve dayanıklılığı bir arada sunuyoruz.",
    features: ["Özel tasarım", "El işçiliği", "Premium malzeme", "Montaj dahil"],
  },
];

export default function HizmetlerPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-display-lg text-display-lg text-primary-container mb-4">Hizmetlerimiz</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl">
            Metal gücümüz ve tecrübemizle, yaşam alanlarınız için güvenli çözümler üretiyoruz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl mx-auto [&>*:last-child:nth-child(odd)]:md:col-span-2 [&>*:last-child:nth-child(odd)]:md:justify-self-center [&>*:last-child:nth-child(odd)]:md:max-w-md [&>*:last-child:nth-child(odd)]:md:w-full">
            {services.map((s) => (
              <GlassPanel key={s.title} className="hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined text-4xl text-primary-container mb-4">
                  {s.icon}
                </span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">{s.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-label-bold text-label-bold text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm text-primary-container">check</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
