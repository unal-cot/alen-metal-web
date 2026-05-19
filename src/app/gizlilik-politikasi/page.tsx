import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function GizlilikPolitikasiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-display-lg text-display-lg text-primary-container mb-4">Gizlilik Politikası</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl">
            Kişisel verilerinizin korunması ve gizliliğiniz bizim için önemlidir.
          </p>

          <div className="space-y-6 max-w-3xl">
            <GlassPanel>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">1. Genel Bilgilendirme</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                ALEN METAL olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) başta olmak üzere,
                kişisel verilerin korunmasına ilişkin tüm yasal düzenlemelere uygun hareket etmekteyiz.
                Bu politika, web sitemiz üzerinden toplanan verilerin nasıl işlendiğini ve korunduğunu açıklamaktadır.
              </p>
            </GlassPanel>

            <GlassPanel>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">2. Toplanan Veriler</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Web sitemiz üzerinden aşağıdaki kişisel veriler toplanabilir:
              </p>
              <ul className="list-disc list-inside font-body-md text-body-md text-on-surface-variant mt-3 space-y-2">
                <li>Ad ve soyad</li>
                <li>E-posta adresi</li>
                <li>Telefon numarası</li>
                <li>İletişim formu aracılığıyla gönderilen mesaj içerikleri</li>
              </ul>
            </GlassPanel>

            <GlassPanel>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">3. Verilerin Kullanım Amacı</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Toplanan kişisel veriler; taleplerinize yanıt vermek, hizmetlerimiz hakkında bilgilendirme
                yapmak, teklif hazırlamak ve yasal yükümlülüklerimizi yerine getirmek amacıyla kullanılmaktadır.
              </p>
            </GlassPanel>

            <GlassPanel>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">4. Veri Güvenliği</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Kişisel verileriniz, yetkisiz erişime karşı korunmakta olup, uygun teknik ve idari tedbirler
                alınmaktadır. Verileriniz hiçbir şekilde üçüncü taraflarla ticari amaçla paylaşılmamaktadır.
              </p>
            </GlassPanel>

            <GlassPanel>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">5. İletişim</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Gizlilik politikamız hakkında sorularınız için bizimle{' '}
                <a href="/iletisim" className="text-primary-container hover:underline">iletişim sayfamızdan</a> iletişime geçebilirsiniz.
              </p>
            </GlassPanel>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
