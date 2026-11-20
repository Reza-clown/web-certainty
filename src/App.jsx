import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import RuleReferenceSection from "./components/RuleReferenceSection";
import SymptomForm from "./components/SymptomForm";
import DiagnosisResult from "./components/DiagnosisResult";
import Footer from "./components/Footer";
import { SIMULATION_PRESETS, SYMPTOMS } from "./data/knowledgeBase";
import { evaluateCertaintyFactor } from "./utils/cfEngine";

function createEmptyAnswers() {
  return Object.fromEntries(SYMPTOMS.map((symptom) => [symptom.id, 0]));
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [profile, setProfile] = useState({
    name: "",
    age: "17",
    platform: "Instagram"
  });
  const [answers, setAnswers] = useState(() => createEmptyAnswers());
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const computed = evaluateCertaintyFactor(answers);
    setResult(computed);
    setActiveTab("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetAnswers = () => {
    setAnswers(createEmptyAnswers());
    setResult(null);
  };

  const handleResetAll = () => {
    setProfile({ name: "", age: "17", platform: "Instagram" });
    setAnswers(createEmptyAnswers());
    setResult(null);
    setActiveTab("diagnose");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyPreset = (presetKey) => {
    const preset = SIMULATION_PRESETS[presetKey];
    if (!preset) return;
    setAnswers({
      ...createEmptyAnswers(),
      ...preset.answers
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasResult={Boolean(result)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "home" && (
          <HeroSection
            onStartDiagnose={() => setActiveTab("diagnose")}
            onViewRules={() => setActiveTab("rules")}
          />
        )}

        {activeTab === "diagnose" && (
          <SymptomForm
            profile={profile}
            setProfile={setProfile}
            answers={answers}
            setAnswers={setAnswers}
            onCalculate={handleCalculate}
            onReset={handleResetAnswers}
            onApplyPreset={handleApplyPreset}
          />
        )}

        {activeTab === "rules" && (
          <RuleReferenceSection
            onStartDiagnose={() => setActiveTab("diagnose")}
          />
        )}

        {activeTab === "result" && result && (
          <DiagnosisResult
            result={result}
            profile={profile}
            onRetake={() => setActiveTab("diagnose")}
            onResetAll={handleResetAll}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}