import React, { useState } from "react";
import {
  Award,
  Printer,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ListChecks,
  Lightbulb
} from "lucide-react";

const BADGE_STYLES = {
  emerald: {
    pill: "bg-emerald-100 text-emerald-800 border-emerald-200",
    bar: "bg-emerald-500",
    card: "border-emerald-200 bg-emerald-50/40"
  },
  amber: {
    pill: "bg-amber-100 text-amber-800 border-amber-200",
    bar: "bg-amber-500",
    card: "border-amber-200 bg-amber-50/40"
  },
  rose: {
    pill: "bg-rose-100 text-rose-800 border-rose-200",
    bar: "bg-rose-500",
    card: "border-rose-200 bg-rose-50/40"
  }
};

export default function DiagnosisResult({
  result,
  profile,
  onRetake,
  onResetAll
}) {
  const [showSteps, setShowSteps] = useState(true);

  if (!result) return null;

  const { topResult, rankedResults } = result;
  const topHyp = topResult.hypothesis;
  const palette = BADGE_STYLES[topHyp.badgeColor] || BADGE_STYLES.amber;

  return (
    <section className="space-y-6">
      <div className={`bg-white border-2 ${palette.card} rounded-3xl p-6 sm:p-8 shadow-xs`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">
                <Award className="w-3.5 h-3.5" />
                Hasil Inferensi Tertinggi
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${palette.pill}`}
              >
                {topHyp.code} • {topHyp.name}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {topHyp.name} ({topResult.percentage}%)
            </h2>

            <p className="text-xs sm:text-sm text-slate-600">
              Responden: <strong>{profile.name || "Anonim"}</strong> • Usia:{" "}
              <strong>{profile.age} tahun</strong> • Platform Utama:{" "}
              <strong>{profile.platform}</strong> • Nilai CF Akhir:{" "}
              <strong className="font-mono">{topResult.cfScore.toFixed(4)}</strong>
            </p>

            <p className="text-sm text-slate-700 leading-relaxed pt-1">
              {topHyp.summary}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 min-w-[220px] text-center shadow-2xs shrink-0">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tingkat Keyakinan CF
            </div>
            <div className="text-4xl font-extrabold text-indigo-700 my-1">
              {topResult.percentage}%
            </div>
            <div className="text-xs font-mono text-slate-500">
              CF = {topResult.cfScore.toFixed(4)}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            <strong>Saran Tindak Lanjut Edukatif:</strong> {topHyp.recommendation}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">
          Perbandingan Nilai Certainty Factor Seluruh Kategori
        </h3>

        <div className="space-y-4">
          {rankedResults.map((item) => {
            const itemStyle = BADGE_STYLES[item.hypothesis.badgeColor] || BADGE_STYLES.amber;
            const widthPercent = Math.max(0, Math.min(100, item.percentage));

            return (
              <div key={item.hypothesis.code} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-800">
                    {item.hypothesis.code} — {item.hypothesis.name}
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    CF: {item.cfScore.toFixed(4)} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${itemStyle.bar}`}
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ListChecks className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Rincian Langkah Perhitungan (Step-by-Step)
              </h3>
              <p className="text-xs text-slate-500">
                Bukti transparansi proses CF[H,E] dan CF Combine pada tiap hipotesis.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSteps((prev) => !prev)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <span>{showSteps ? "Sembunyikan" : "Tampilkan"}</span>
            {showSteps ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {showSteps && (
          <div className="space-y-6 pt-2">
            {rankedResults.map((item) => (
              <div
                key={item.hypothesis.code}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-slate-800">
                    {item.hypothesis.code}: {item.hypothesis.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-700">
                    Hasil Akhir = {item.cfScore.toFixed(4)}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white text-slate-500 border-b border-slate-100">
                      <tr>
                        <th className="py-2 px-3">Aturan</th>
                        <th className="py-2 px-3">CF Pakar</th>
                        <th className="py-2 px-3">CF User</th>
                        <th className="py-2 px-3">CF[H,E]</th>
                        <th className="py-2 px-3">Proses Kombinasi</th>
                        <th className="py-2 px-3 text-right">CF Kumulatif</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {item.steps.map((step, idx) => (
                        <tr key={step.ruleId} className="hover:bg-slate-50/60">
                          <td className="py-2 px-3 font-mono font-semibold text-slate-700">
                            {step.ruleId} ({step.symptomId})
                          </td>
                          <td className="py-2 px-3 font-mono">
                            {step.cfExpert.toFixed(2)}
                          </td>
                          <td className="py-2 px-3 font-mono">
                            {step.cfUser.toFixed(1)}
                          </td>
                          <td className="py-2 px-3 font-mono font-semibold text-teal-700">
                            {step.cfHE.toFixed(4)}
                          </td>
                          <td className="py-2 px-3 font-mono text-slate-600">
                            {idx === 0 ? "Awal (CF1)" : step.formulaUsed}
                          </td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-indigo-700">
                            {step.nextCombined.toFixed(4)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ubah Jawaban</span>
          </button>

          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition cursor-pointer"
          >
            <span>Mulai Sesi Baru</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>
    </section>
  );
}   