import React from "react";
import { Brain, ClipboardList, BookOpen, BarChart3 } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, hasResult }) {
  const navItems = [
    { id: "home", label: "Beranda & Konsep", icon: Brain },
    { id: "diagnose", label: "Kuesioner Diagnosa", icon: ClipboardList },
    { id: "rules", label: "Basis Pengetahuan CF", icon: BookOpen },
    { id: "result", label: "Hasil Analisa", icon: BarChart3, disabled: !hasResult }
  ];

  return (
    <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 leading-tight">
              SP-NPD Remaja
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              Metode Certainty Factor
            </div>
          </div>
        </button>

        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={() => !item.disabled && setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs"
                    : item.disabled
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}