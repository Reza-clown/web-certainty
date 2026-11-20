import React from "react";
import { BookOpen, Calculator, Scale, Database } from "lucide-react";
import {
  EXPERT_RULES,
  HYPOTHESES,
  SYMPTOMS,
  USER_CONFIDENCE_SCALE
} from "../data/knowledgeBase";

export default function RuleReferenceSection({ onStartDiagnose }) {
  const symptomMap = Object.fromEntries(SYMPTOMS.map((s) => [s.id, s]));

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <BookOpen className="w-4 h-4" />
            Dokumentasi Basis Pengetahuan
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Formulasi Matematis & Aturan Pakar (CF)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Transparansi bobot pakar (MB &amp; MD), skala keyakinan pengguna, serta basis
            aturan yang digunakan mesin inferensi.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartDiagnose}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition shrink-0 cursor-pointer"
        >
          Ke Form Kuesioner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Persamaan Certainty Factor
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-semibold text-slate-700 mb-1">
                1. Nilai CF Pakar (Dari Bobot Kepercayaan &amp; Ketidakpercayaan)
              </div>
              <code className="block font-mono text-indigo-700 font-bold text-sm">
                CF_Pakar = MB(H, E) - MD(H, E)
              </code>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-semibold text-slate-700 mb-1">
                2. Nilai CF Gejala Tunggal (Kombinasi User &amp; Pakar)
              </div>
              <code className="block font-mono text-indigo-700 font-bold text-sm">
                CF[H, E] = CF_User × CF_Pakar
              </code>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-semibold text-slate-700 mb-1">
                3. Kombinasi Sekuensial Dua Gejala Positif (CF Combine)
              </div>
              <code className="block font-mono text-indigo-700 font-bold text-sm">
                CF_Combine(CF1, CF2) = CF1 + CF2 × (1 - CF1)
              </code>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-semibold text-slate-700 mb-1">
                4. Konversi Persentase Keyakinan
              </div>
              <code className="block font-mono text-indigo-700 font-bold text-sm">
                Persentase (%) = CF_Akhir × 100%
              </code>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Skala Keyakinan Pengguna &amp; Hipotesis
            </h3>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3.5 font-semibold">Interpretasi Pengguna</th>
                  <th className="py-2.5 px-3.5 font-semibold text-right">Bobot CF User</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {USER_CONFIDENCE_SCALE.map((scale) => (
                  <tr key={scale.value} className="hover:bg-slate-50/70">
                    <td className="py-2 px-3.5 text-slate-700">{scale.label}</td>
                    <td className="py-2 px-3.5 text-right font-mono font-bold text-indigo-700">
                      {scale.value.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {Object.values(HYPOTHESES).map((hyp) => (
              <div
                key={hyp.code}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/70"
              >
                <span className="text-[11px] font-bold text-indigo-600">{hyp.code}</span>
                <div className="font-bold text-xs text-slate-900 mt-0.5">{hyp.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Tabel Basis Aturan Pakar (R01 – R12)
            </h3>
            <p className="text-xs text-slate-500">
              Pemetaan indikator gejala perilaku media sosial terhadap hipotesis kecenderungan NPD.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="py-3 px-3.5 font-semibold">Kode</th>
                <th className="py-3 px-3.5 font-semibold">Gejala / Indikator Perilaku</th>
                <th className="py-3 px-3.5 font-semibold">Hipotesis</th>
                <th className="py-3 px-3.5 font-semibold text-right">MB</th>
                <th className="py-3 px-3.5 font-semibold text-right">MD</th>
                <th className="py-3 px-3.5 font-semibold text-right">CF Pakar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {EXPERT_RULES.map((rule) => {
                const symptom = symptomMap[rule.symptomId];
                const hyp = HYPOTHESES[rule.hypothesisId];
                return (
                  <tr key={rule.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3.5 font-mono font-bold text-slate-700">
                      {rule.id}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-800">
                      <span className="font-semibold text-indigo-600 mr-1.5">
                        [{rule.symptomId}]
                      </span>
                      {symptom?.name}
                    </td>
                    <td className="py-2.5 px-3.5">
                      <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700">
                        {hyp?.code} ({hyp?.level})
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600">
                      {rule.mb.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600">
                      {rule.md.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-mono font-bold text-teal-700">
                      {rule.cfExpert.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}