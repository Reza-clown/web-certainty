import { EXPERT_RULES, HYPOTHESES, SYMPTOMS } from "../data/knowledgeBase";

export function combineCF(cf1, cf2) {
  if (cf1 >= 0 && cf2 >= 0) {
    return cf1 + cf2 * (1 - cf1);
  }
  if (cf1 < 0 && cf2 < 0) {
    return cf1 + cf2 * (1 + cf1);
  }
  const denominator = 1 - Math.min(Math.abs(cf1), Math.abs(cf2));
  return denominator === 0 ? 0 : (cf1 + cf2) / denominator;
}

export function evaluateCertaintyFactor(userAnswers) {
  const symptomMap = Object.fromEntries(SYMPTOMS.map((item) => [item.id, item]));

  const hypothesisIds = Object.keys(HYPOTHESES);
  const resultsByHypothesis = {};

  hypothesisIds.forEach((hId) => {
    const matchingRules = EXPERT_RULES.filter((rule) => rule.hypothesisId === hId);

    let combinedCf = 0;
    let hasFirstRule = false;
    const steps = [];

    matchingRules.forEach((rule) => {
      const cfUser = Number(userAnswers[rule.symptomId] ?? 0);
      const cfHE = Number((cfUser * rule.cfExpert).toFixed(4));
      const symptom = symptomMap[rule.symptomId];

      let nextCombined = combinedCf;
      let formulaUsed = "";

      if (!hasFirstRule) {
        nextCombined = cfHE;
        hasFirstRule = true;
        formulaUsed = `Inisialisasi CF = ${cfHE.toFixed(4)}`;
      } else {
        if (combinedCf >= 0 && cfHE >= 0) {
          formulaUsed = `${combinedCf.toFixed(4)} + ${cfHE.toFixed(4)} × (1 - ${combinedCf.toFixed(4)})`;
        } else if (combinedCf < 0 && cfHE < 0) {
          formulaUsed = `${combinedCf.toFixed(4)} + ${cfHE.toFixed(4)} × (1 + ${combinedCf.toFixed(4)})`;
        } else {
          const minAbs = Math.min(Math.abs(combinedCf), Math.abs(cfHE));
          formulaUsed = `(${combinedCf.toFixed(4)} + ${cfHE.toFixed(4)}) / (1 - ${minAbs.toFixed(4)})`;
        }
        nextCombined = combineCF(combinedCf, cfHE);
      }

      steps.push({
        ruleId: rule.id,
        symptomId: rule.symptomId,
        symptomName: symptom ? symptom.name : rule.symptomId,
        mb: rule.mb,
        md: rule.md,
        cfExpert: rule.cfExpert,
        cfUser,
        cfHE,
        prevCombined: combinedCf,
        nextCombined,
        formulaUsed
      });

      combinedCf = nextCombined;
    });

    const clampedScore = Math.max(-1, Math.min(1, combinedCf));
    const percentage = Math.max(0, Number((clampedScore * 100).toFixed(2)));

    resultsByHypothesis[hId] = {
      hypothesis: HYPOTHESES[hId],
      cfScore: Number(clampedScore.toFixed(4)),
      percentage,
      steps
    };
  });

  const rankedResults = Object.values(resultsByHypothesis).sort(
    (a, b) => b.cfScore - a.cfScore
  );

  return {
    topResult: rankedResults[0],
    rankedResults,
    byHypothesis: resultsByHypothesis
  };
}