const services = [
  {
    title: "Tel Çit",
    icon: "fence",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgCTYOaY27eGmba0CfkVJYwS7pOlBzjYb3SzMerG8pBgHs6dnCk4-H1ggFwN6hzSUZbdNuVTloO-DtCteFQC8lSwDswE6ib6ivOeSMe8o1z7uWO12RZ19zhn88l0JabQq1qy98FURWeTX63n_StKXd8Oe-8O2I_cLS8NbYXFLpcXwmR76XboRGSBgusWywXBY7KTyqMK5Py4IbsBZnqF-2tw5xxjIIQp3t8YWVQn2xM3dnnpxNsICtPAvdIZb04fLbfnEH59eR0QyM",
    desc: "Dayanıklı ve uzun ömürlü tel çit sistemleri ile alanlarınızı güvence altına alıyoruz.",
  },
  {
    title: "Panel Çit",
    icon: "grid_on",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2yHkVZyuv0T_9_J7jUk3a0RZYJ2YO8yQbpJxkwpF3oWuighARRZIDNUAAmdfmlytyWHY1cDog54Fpu2WZsmtWwux99BbffIkVozimVzfmctAhr8fD3sCAPNpwATnolX4BKCJP37mvk5STdeiL3hOwNTOts0LRwN80apPbqZ1IpGOx-m7-g9Ub9cTIpIYjl2kxGihiWKadbdgq5e2mZ3KVwCXJNhtGx53E69YGO1E-alp7nD5T_sJbaxSb11t4rG4aUGNKv7d8eH1k",
    desc: "Estetik ve sağlam panel çit sistemleri ile güvenliği en üst seviyeye çıkarıyoruz.",
  },
  {
    title: "Çim Çit",
    icon: "grass",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuTROix_n2P1VI1zuFgHWWG5mkWAu8SLvBOov0Unqrg2-vKruWWgji4BpaSCc6jOXI3J3O7AGwAnEqaYjoUe0n3PGsm92CmgwQqXZR5U49-M6tnszck7Lds4v1QqGBzvfhgTKsePaTKKjsRhEyT67G7bDoSpEMFkFj3U5SFvEj9OJtufNvC93BSMYgp9q7QnZC4rZHANi213PapXHbFu9SzDXrumx0hT83rLrQjSQ4qB4Ot-1NQVCQtaDQAKkdW6s6-ZMjjNbucqjZ",
    desc: "Doğal görünüm sunan çim çit sistemleri ile estetik ve mahremiyet sağlar.",
  },
];

const moreServices = [
  { icon: "door_sliding", label: "Otomatik Kapı Sistemleri" },
  { icon: "architecture", label: "Dekoratif Metal Ürünleri" },
  { icon: "precision_manufacturing", label: "Lazer Kesim Hizmetleri" },
];

export function ServicesGrid() {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-xl text-headline-xl text-primary-container mb-12 text-center">
          HİZMETLERİMİZ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative h-80 rounded-lg overflow-hidden border border-outline-variant/30 cursor-pointer"
            >
              <img
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={s.image}
              />
              <div className="absolute inset-0 card-gradient flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary-container">{s.icon}</span>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface">{s.title}</h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
                  {s.desc}
                </p>
                <span className="text-primary-container font-label-bold text-label-bold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                  Detayları Gör{" "}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
          {moreServices.map((s) => (
            <div
              key={s.label}
              className="glass-panel p-4 rounded-lg flex items-center gap-3 hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary-container">{s.icon}</span>
              <span className="font-label-bold text-label-bold text-on-surface">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
