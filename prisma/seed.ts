import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const password = await hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@alenmetal.com" },
    update: {},
    create: { name: "Admin", email: "admin@alenmetal.com", password, role: "ADMIN" },
  });

  // Services
  const services = [
    { title: "Tel Çit", description: "Dayanıklı ve uzun ömürlü tel çit sistemleri ile alanlarınızı güvence altına alıyoruz.", icon: "fence", order: 0 },
    { title: "Panel Çit", description: "Estetik ve sağlam panel çit sistemleri ile güvenliği en üst seviyeye çıkarıyoruz.", icon: "grid_on", order: 1 },
    { title: "Çim Çit", description: "Doğal görünüm sunan çim çit sistemleri ile estetik ve mahremiyet sağlar.", icon: "grass", order: 2 },
    { title: "Otomatik Kapı Sistemleri", description: "Son teknoloji otomatik kapı sistemlerimizle güvenlik ve konforu bir arada sunuyoruz.", icon: "door_sliding", order: 3 },
    { title: "Dekoratif Metal Ürünleri", description: "El işçiliği ve modern üretim tekniklerini birleştirerek benzersiz dekoratif metal ürünler tasarlıyoruz.", icon: "architecture", order: 4 },
  ];
  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  // Stats
  const stats = [
    { label: "Tamamlanan Proje", value: "500+", order: 0 },
    { label: "Yıllık Tecrübe", value: "10+", order: 1 },
    { label: "Mutlu Müşteri", value: "1000+", order: 2 },
  ];
  for (const s of stats) {
    await prisma.stat.create({ data: s });
  }

  // Projects (Gallery)
  const projects = [
    { title: "Modern Kayar Kapı", description: "Lüks rezidans için otomatik kayar kapı sistemi", category: "Otomatik Kapı", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA353CKxl5bI0gk8uvabHaHTch4K72ByMLEZtAsIsooGwaJlqIdn0iAugUYqzeu1s9Y1CgQd86iEsk2o7OMgSVuI02EbbQHe-JKzwvBRrYPWffROa7a05dTNn1jX_b6djUWun45oYYy2HCLUMkF7hWgimsbYP9nSVr-9S5l6JsUCRts9RxuM_1-QAgJGtjYlwnNf1N0yTxGN0P7aiRb6ax4NsZphF268zOcUJdGU0YYp43kQahbklMRbzovTem12ZjOxKkJt0DKYSEL" },
    { title: "Endüstriyel Tel Çit", description: "Fabrika çevresi tel çit uygulaması", category: "Tel Çit", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgCTYOaY27eGmba0CfkVJYwS7pOlBzjYb3SzMerG8pBgHs6dnCk4-H1ggFwN6hzSUZbdNuVTloO-DtCteFQC8lSwDswE6ib6ivOeSMe8o1z7uWO12RZ19zhn88l0JabQq1qy98FURWeTX63n_StKXd8Oe-8O2I_cLS8NbYXFLpcXwmR76XboRGSBgusWywXBY7KTyqMK5Py4IbsBZnqF-2tw5xxjIIQp3t8YWVQn2xM3dnnpxNsICtPAvdIZb04fLbfnEH59eR0QyM" },
    { title: "Panel Çit Uygulaması", description: "Modern toplu konut panel çit sistemi", category: "Panel Çit", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2yHkVZyuv0T_9_J7jUk3a0RZYJ2YO8yQbpJxkwpF3oWuighARRZIDNUAAmdfmlytyWHY1cDog54Fpu2WZsmtWwux99BbffIkVozimVzfmctAhr8fD3sCAPNpwATnolX4BKCJP37mvk5STdeiL3hOwNTOts0LRwN80apPbqZ1IpGOx-m7-g9Ub9cTIpIYjl2kxGihiWKadbdgq5e2mZ3KVwCXJNhtGx53E69YGO1E-alp7nD5T_sJbaxSb11t4rG4aUGNKv7d8eH1k" },
    { title: "Çim Çit Montaj", description: "Villa bahçesi çim çit uygulaması", category: "Çim Çit", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuTROix_n2P1VI1zuFgHWWG5mkWAu8SLvBOov0Unqrg2-vKruWWgji4BpaSCc6jOXI3J3O7AGwAnEqaYjoUe0n3PGsm92CmgwQqXZR5U49-M6tnszck7Lds4v1QqGBzvfhgTKsePaTKKjsRhEyT67G7bDoSpEMFkFj3U5SFvEj9OJtufNvC93BSMYgp9q7QnZC4rZHANi213PapXHbFu9SzDXrumx0hT83rLrQjSQ4qB4Ot-1NQVCQtaDQAKkdW6s6-ZMjjNbucqjZ" },
    { title: "Kapı Motor Sistemi", description: "Endüstriyel tesis için ağır yük kapı motoru", category: "Otomatik Kapı", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcJx5QZ4i0pSIttr8N0BzBqLxv2ZVNMn6w6ENWQfYgjAODIU4RQ4q4aUPAxj2i6DFp8Ob0aJm1MnXRq7UtQhwSjKBS7XlOFEB1yN-itsKUFOkR7W-NhuB2j3TBNWn9GtlZkBPF9XXhAHERKoA6xtKvsNts9bTqoLYJE58f5GQMjVCPbJjQ-_qQqkzL22ZQK2C9HxlNP5t3dNq3TkVGHNkFqMA5Q5t8WYkG8Z2FNUpMJYYYmpvE5Y9sMGMCFjYXtQr6RBFX" },
    { title: "Metal Panel Detay", description: "Premium panel çit yakın detay görünümü", category: "Panel Çit", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9TJH8Lf3RcTkHGhUOwX8XmNhZq0VbZC5JbC4aVkHksLlNIq0YVqYqT6GYcJ5FJKL0G0Fs6W7k1mVhHDoKUtpR2sX2aFY6nJ0q0sYvDdKuI6XbCvYQzI1eF01MkQ0Q-V8fhOlVzLdPjk0X3I2CN8wEmcrZN3l7dG-xSqkyrKmC_V" },
  ];
  for (const p of projects) {
    await prisma.project.create({ data: p });
  }

  // Site config
  const configs = [
    { key: "tagline", value: "Güvenlikte Kalite, İşte Güç!" },
    { key: "hero_description", value: "Metal gücümüz ve tecrübemizle, yaşam alanlarınız için güvenli çözümler üretiyoruz. Dayanıklılık ve estetiği bir araya getiren premium uygulamalar." },
    { key: "phone_1", value: "0530 845 1754" },
    { key: "phone_2", value: "0541 204 2908" },
    { key: "footer_description", value: "Güçlü Yapılar, Güvenli Yarınlar." },
    { key: "address", value: "İstanbul, Türkiye" },
    { key: "copyright", value: "© 2024 Alen Metal. Güçlü Yapılar, Güvenli Yarınlar." },
  ];
  for (const c of configs) {
    await prisma.siteConfig.upsert({
      where: { key: c.key },
      update: { value: c.value },
      create: c,
    });
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
