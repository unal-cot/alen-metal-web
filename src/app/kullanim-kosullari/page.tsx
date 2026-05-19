import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function KullanimKosullariPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-display-lg text-display-lg text-primary-container mb-4">Kullanım Koşulları</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl">
            Web sitemizi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.
          </p>

          <div className="space-y-6 max-w-3xl">
            <GlassPanel>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">1. Genel Hükümler</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Bu web sitesi ALEN METAL tarafından işletilmektedir. Siteyi ziyaret eden her kullanıcı,
                bu kullanım koşullarını okumuş ve kabul etmiş sayılır. ALEN METAL, bu koşulları önceden
                haber vermeksizin değiştirme hakkını saklı tutar.
              </p>
            </GlassPanel>

            <GlassPanel>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">2. Fikri Mülkiyet</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Bu sitede yer alan tüm içerik, logo, fotoğraf, metin ve diğer materyaller ALEN METAL&apos;in
                fikri mülkiyetidir. Yazılı izin alınmadan kopyalanamaz, çoğaltılamaz veya kullanılamaz.
              </p>
            </GlassPanel>

            <GlassPanel>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">3. Sorumluluk Reddi</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Web sitemizde yer alan bilgilerin doğruluğu için azami özen gösterilse de, ALEN METAL
                bu bilgilerin eksiksiz veya hatasız olduğunu garanti etmez. Site kullanımından doğabilecek
                zararlardan ALEN METAL sorumlu tutulamaz.
              </p>
            </GlassPanel>

            <GlassPanel>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">4. Üçüncü Taraf Bağlantıları</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Sitemiz üzerinden üçüncü taraf sitelere verilen bağlantılar yalnızca bilgilendirme amaçlıdır.
                ALEN METAL, bu sitelerin içeriğinden sorumlu değildir.
              </p>
            </GlassPanel>

            <GlassPanel>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">5. İletişim</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Kullanım koşulları hakkında sorularınız için{' '}
                <a href="/iletisim" className="text-primary-container hover:underline">iletişim sayfamızdan</a> bize ulaşabilirsiniz.
              </p>
            </GlassPanel>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
