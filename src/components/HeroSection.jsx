import React from "react";
import { ArrowRight, BookOpen, ShieldAlert, Sparkles, Layers, Calculator, CheckCircle2 } from "lucide-react";

export default function HeroSection({ onStartDiagnose, onViewRules }) {
  const workflowSteps = [
    {
      step: "01",
      title: "Input Gejala Perilaku",
      desc: "Pengguna memilih tingkat keyakinan/frekuensi pada 12 indikator aktivitas media sosial.",
      icon: Sparkles
    },
    {
      step: "02",
      title: "Bobot Pakar (MB & MD)",
      desc: "Setiap indikator memiliki nilai Measure of Belief (MB) dan Measure of Disbelief (MD).",
      icon: Layers
    },
    {
      step: "03",
      title: "Kombinasi Certainty Factor",
      desc: "Sistem menghitung CF[H,E] dan menggabungkannya secara sekuensial dengan rumus CF Combine.",
      icon: Calculator
    },
    {
      step: "04",
      title: "Klasifikasi & Rekomendasi",
      desc: "Menampilkan tingkat kecenderungan NPD (Rendah, Sedang, Tinggi) beserta persentasenya.",
      icon: CheckCircle2
    }
  ];

  return (
    <section className="space-y-10">
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-5 relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-100 text-xs font-semibold">
            Sistem Pakar Berbasis Pengetahuan • Certainty Factor
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Deteksi Dini Kecenderungan{" "}
            <span className="text-teal-300">Narcissistic Personality Disorder (NPD)</span>{" "}
            pada Remaja Aktif Pengguna Media Sosial
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Aplikasi ini menerapkan metode <strong>Certainty Factor (CF)</strong> untuk
            mengukur tingkat kepastian kecenderungan perilaku narsistik berdasarkan pola
            interaksi, pencarian validasi, dan sensitivitas ego remaja di platform digital.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onStartDiagnose}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm transition shadow-md cursor-pointer"
            >
              <span>Mulai Skrining Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onViewRules}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Lihat Rumus & Aturan Pakar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {workflowSteps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-indigo-300 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400">TAHAP {item.step}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong>Catatan Edukasi & Etika Klinis:</strong> Perangkat lunak ini dibangun
          sebagai purwarupa akademik untuk mendemonstrasikan inferensi ketidakpastian
          menggunakan metode <em>Certainty Factor</em>. Hasil skrining bukan merupakan
          diagnosis medis atau psikologis resmi.
        </div>
      </div>
    </section>
  );
}   