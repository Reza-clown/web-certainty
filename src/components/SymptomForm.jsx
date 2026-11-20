import React from "react";
import {
  User,
  Smartphone,
  RotateCcw,
  Calculator,
  Sparkles,
  AlertCircle
} from "lucide-react";
import {
  SYMPTOMS,
  USER_CONFIDENCE_SCALE,
  SIMULATION_PRESETS
} from "../data/knowledgeBase";

export default function SymptomForm({
  profile,
  setProfile,
  answers,
  setAnswers,
  onCalculate,
  onReset,
  onApplyPreset
}) {
  const answeredCount = Object.values(answers).filter((val) => val > 0).length;

  const handleSelectAnswer = (symptomId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [symptomId]: Number(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Kuesioner Gejala Perilaku Media Sosial
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Isi data responden lalu pilih tingkat frekuensi/keyakinan pada setiap
              indikator perilaku.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Preset Uji:
            </span>
            {Object.entries(SIMULATION_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                type="button"
                onClick={() => onApplyPreset(key)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Nama / Inisial Responden
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Contoh: Raka (17 Th)"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Usia Remaja (Tahun)
            </label>
            <input
              type="number"
              min="12"
              max="24"
              required
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Platform Media Sosial Utama
            </label>
            <div className="relative">
              <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={profile.platform}
                onChange={(e) => setProfile({ ...profile, platform: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="X (Twitter)">X (Twitter)</option>
                <option value="YouTube">YouTube</option>
                <option value="Threads / Lainnya">Threads / Lainnya</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {SYMPTOMS.map((symptom, index) => {
          const currentValue = answers[symptom.id] ?? 0;
          return (
            <div
              key={symptom.id}
              className={`bg-white border rounded-2xl p-4 sm:p-5 transition ${
                currentValue > 0
                  ? "border-indigo-300 shadow-xs"
                  : "border-slate-200"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-bold">
                      {symptom.id}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-indigo-600">
                      {symptom.category}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {index + 1}. {symptom.name}
                  </p>
                </div>

                <div className="w-full lg:w-72 shrink-0">
                  <select
                    aria-label={symptom.name}
                    value={currentValue}
                    onChange={(e) => handleSelectAnswer(symptom.id, e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      currentValue > 0
                        ? "border-indigo-400 bg-indigo-50/40 text-indigo-950"
                        : "border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    {USER_CONFIDENCE_SCALE.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
          <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            Terpilih <strong>{answeredCount}</strong> dari{" "}
            <strong>{SYMPTOMS.length}</strong> indikator aktif (CF User &gt; 0).
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Hitung Certainty Factor</span>
          </button>
        </div>
      </div>
    </form>
  );
}