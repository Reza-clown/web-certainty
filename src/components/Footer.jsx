import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          <strong className="text-slate-700">
            Sistem Pakar Deteksi Dini Kecenderungan NPD pada Remaja Pengguna Media Sosial
          </strong>{" "}
          — Metode Certainty Factor
        </div>
        <div>Tugas Perkuliahan Sistem Pakar • React.js</div>
      </div>
    </footer>
  );
}