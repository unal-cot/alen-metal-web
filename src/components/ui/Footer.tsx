import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-16 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-start gap-gutter bg-surface-container-lowest border-t border-outline-variant/20">
      <div className="flex flex-col gap-4 max-w-sm">
        <div className="flex items-center gap-4">
          <img src="/logo.png?v=5" alt="ALEN METAL" style={{ height: "112px", width: "auto", objectFit: "contain" }} />
          <span className="font-headline-lg text-headline-lg font-bold text-primary-container">
            ALEN METAL
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Güçlü Yapılar, Güvenli Yarınlar. Metal gücümüz ve tecrübemizle yaşam alanlarınız için güvenli çözümler.
        </p>
        <p className="font-label-bold text-label-bold text-primary-container mt-4">
          &copy; 2024 Alen Metal. Güçlü Yapılar, Güvenli Yarınlar.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-headline-lg text-headline-lg text-on-surface text-xl">Hızlı Linkler</h4>
        <Link href="/hizmetler" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200">Hizmetlerimiz</Link>
        <Link href="/hizmetler" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200">Panel Çit</Link>
        <Link href="/hizmetler" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200">Tel Çit</Link>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-headline-lg text-headline-lg text-on-surface text-xl">İletişim</h4>
        <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
          <span className="material-symbols-outlined text-primary-container">person</span>
          Ali Berkant Karabulut: 0530 845 1754
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
          <span className="material-symbols-outlined text-primary-container">person</span>
          Engin TOPGÜL: 0541 204 2908
        </div>
        <Link href="/iletisim" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200 mt-4">Gizlilik Politikası</Link>
        <Link href="/iletisim" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200">Kullanım Koşulları</Link>
      </div>
    </footer>
  );
}
