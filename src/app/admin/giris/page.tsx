"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError("Geçersiz e-posta veya şifre.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-margin-mobile">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img src="/logo.png?v=5" alt="ALEN METAL" style={{ height: "180px", width: "auto", objectFit: "contain", margin: "0 auto 16px" }} />
          <h1 className="font-headline-xl text-headline-xl text-primary-container mb-2">ALEN METAL</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Yönetim Paneli</p>
        </div>
        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-lg space-y-5">
          <div>
            <label className="font-label-bold text-label-bold text-on-surface block mb-2">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 text-on-surface focus:border-primary-container focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="font-label-bold text-label-bold text-on-surface block mb-2">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 text-on-surface focus:border-primary-container focus:outline-none transition-colors"
              required
            />
          </div>
          {error && <p className="text-error font-label-bold text-label-bold">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-container text-on-primary-container font-label-bold text-label-bold px-6 py-3 rounded hover:bg-primary-container/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
