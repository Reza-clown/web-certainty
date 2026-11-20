export const HYPOTHESES = {
  P01: {
    code: "P01",
    name: "Kecenderungan NPD Rendah",
    level: "Rendah",
    badgeColor: "emerald",
    summary:
      "Penggunaan media sosial masih berada pada batas wajar. Kebutuhan akan validasi sosial tidak mendominasi interaksi maupun identitas diri.",
    recommendation:
      "Pertahankan kebiasaan sehat dalam bermedia sosial, jaga keseimbangan aktivitas dunia nyata, dan terus latih empati interpersonal secara langsung."
  },
  P02: {
    code: "P02",
    name: "Kecenderungan NPD Sedang",
    level: "Sedang",
    badgeColor: "amber",
    summary:
      "Terdapat pola keterikatan yang cukup kuat pada pujian, pencitraan diri, atau reaksi audiens di media sosial yang mulai memengaruhi emosi atau relasi.",
    recommendation:
      "Kurangi ketergantungan pada metrik like/komentar, lakukan digital detox berkala, dan refleksikan sudut pandang orang lain dalam diskusi."
  },
  P03: {
    code: "P03",
    name: "Kecenderungan NPD Tinggi",
    level: "Tinggi",
    badgeColor: "rose",
    summary:
      "Terlihat indikasi kuat kebutuhan akan kekaguman berlebih, rasa superioritas daring, atau sensitivitas tinggi terhadap kritik/pengabaian di media sosial.",
    recommendation:
      "Pertimbangkan berdiskusi dengan konselor kampus atau psikolog profesional untuk evaluasi lebih lanjut, serta bangun rutinitas offline yang bermakna."
  }
};

export const USER_CONFIDENCE_SCALE = [
  { value: 0.0, label: "Tidak Pernah / Tidak Yakin (0.0)" },
  { value: 0.2, label: "Jarang / Sedikit Yakin (0.2)" },
  { value: 0.4, label: "Kadang-kadang / Cukup Yakin (0.4)" },
  { value: 0.6, label: "Sering / Yakin (0.6)" },
  { value: 0.8, label: "Sangat Sering / Sangat Yakin (0.8)" },
  { value: 1.0, label: "Selalu / Mutlak Yakin (1.0)" }
];

export const SYMPTOMS = [
  {
    id: "G01",
    name: "Selalu ingin menjadi pusat perhatian di setiap unggahan atau story",
    category: "Kebutuhan Kekaguman"
  },
  {
    id: "G02",
    name: "Merasa cemas atau kecewa jika jumlah like, views, atau komentar sedikit",
    category: "Validasi Sosial"
  },
  {
    id: "G03",
    name: "Cenderung memamerkan pencapaian, penampilan, atau gaya hidup secara berlebihan",
    category: "Grandiositas"
  },
  {
    id: "G04",
    name: "Mudah tersinggung atau marah saat mendapat kritik atau komentar berbeda pendapat",
    category: "Sensitivitas Ego"
  },
  {
    id: "G05",
    name: "Merasa dirinya paling paham, paling unggul, atau lebih spesial dibanding pengikut lain",
    category: "Superioritas"
  },
  {
    id: "G06",
    name: "Kurang peka terhadap perasaan orang lain saat berdebat atau berinteraksi daring",
    category: "Kurang Empati"
  },
  {
    id: "G07",
    name: "Menggunakan media sosial untuk memanipulasi simpati atau membentuk citra diri palsu",
    category: "Pencitraan"
  },
  {
    id: "G08",
    name: "Mengharapkan perlakuan istimewa dari teman atau komunitas daring tanpa timbal balik",
    category: "Ekspektasi Khusus"
  },
  {
    id: "G09",
    name: "Merasa iri ketika melihat keberhasilan teman sebaya di media sosial",
    category: "Rasa Iri"
  },
  {
    id: "G10",
    name: "Sulit mengakui kesalahan sendiri saat terjadi konflik di ruang digital",
    category: "Defensif"
  },
  {
    id: "G11",
    name: "Menghabiskan waktu berjam-jam demi mengedit foto/video sebelum diunggah",
    category: "Perfeksionisme Citra"
  },
  {
    id: "G12",
    name: "Merasa diabaikan atau diremehkan jika pesan/unggahan tidak segera direspons",
    category: "Kebutuhan Perhatian"
  }
];

export const EXPERT_RULES = [
  { id: "R01", symptomId: "G01", hypothesisId: "P03", mb: 0.85, md: 0.15 },
  { id: "R02", symptomId: "G02", hypothesisId: "P02", mb: 0.75, md: 0.20 },
  { id: "R03", symptomId: "G03", hypothesisId: "P03", mb: 0.80, md: 0.15 },
  { id: "R04", symptomId: "G04", hypothesisId: "P02", mb: 0.70, md: 0.25 },
  { id: "R05", symptomId: "G05", hypothesisId: "P03", mb: 0.88, md: 0.12 },
  { id: "R06", symptomId: "G06", hypothesisId: "P03", mb: 0.82, md: 0.18 },
  { id: "R07", symptomId: "G07", hypothesisId: "P02", mb: 0.72, md: 0.22 },
  { id: "R08", symptomId: "G08", hypothesisId: "P03", mb: 0.78, md: 0.20 },
  { id: "R09", symptomId: "G09", hypothesisId: "P02", mb: 0.68, md: 0.25 },
  { id: "R10", symptomId: "G10", hypothesisId: "P02", mb: 0.74, md: 0.20 },
  { id: "R11", symptomId: "G11", hypothesisId: "P01", mb: 0.75, md: 0.15 },
  { id: "R12", symptomId: "G12", hypothesisId: "P01", mb: 0.70, md: 0.20 }
].map((rule) => ({
  ...rule,
  cfExpert: Number((rule.mb - rule.md).toFixed(4))
}));

export const SIMULATION_PRESETS = {
  low: {
    label: "Simulasi Rendah",
    answers: {
      G01: 0.2,
      G02: 0.2,
      G03: 0.0,
      G04: 0.2,
      G05: 0.0,
      G06: 0.0,
      G07: 0.0,
      G08: 0.2,
      G09: 0.2,
      G10: 0.2,
      G11: 0.8,
      G12: 0.6
    }
  },
  moderate: {
    label: "Simulasi Sedang",
    answers: {
      G01: 0.4,
      G02: 0.8,
      G03: 0.4,
      G04: 0.6,
      G05: 0.2,
      G06: 0.4,
      G07: 0.6,
      G08: 0.2,
      G09: 0.8,
      G10: 0.6,
      G11: 0.4,
      G12: 0.4
    }
  },
  high: {
    label: "Simulasi Tinggi",
    answers: {
      G01: 1.0,
      G02: 0.8,
      G03: 0.8,
      G04: 0.8,
      G05: 1.0,
      G06: 0.8,
      G07: 0.6,
      G08: 0.8,
      G09: 0.6,
      G10: 0.8,
      G11: 0.4,
      G12: 0.6
    }
  }
};  