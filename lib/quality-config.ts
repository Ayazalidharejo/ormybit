export const genericPhrases = [
  "in today's digital landscape",
  "it's important to note",
  "unlock the power of",
  "in conclusion",
  "delve into",
  "dive into",
  "a testament to",
  "seamlessly integrate",
  "at the end of the day",
  "when it comes to",
  "is paramount",
  "crucial role",
  "game changer",
  "game-changer",
  "moreover,",
  "furthermore,",
  "additionally,",
  "in a nutshell",
  "by and large",
  "navigating the complexities",
  "fostering innovation"
];

export function checkRepetitions(text: string) {
  // Simple check for repetitive sentence openers
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const openers: Record<string, number> = {};
  const repeatedOpeners: { phrase: string; count: number }[] = [];
  
  sentences.forEach(sentence => {
    const words = sentence.trim().split(' ').slice(0, 3).join(' ').toLowerCase();
    if (words.length > 5) {
      openers[words] = (openers[words] || 0) + 1;
    }
  });

  Object.entries(openers).forEach(([phrase, count]) => {
    if (count > 2) {
      repeatedOpeners.push({ phrase, count });
    }
  });

  return repeatedOpeners;
}

export function calculateBurstiness(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length < 2) return { score: 100, variance: 0, label: "Not enough sentences" };

  const lengths = sentences.map(s => s.trim().split(' ').length);
  const mean = lengths.reduce((sum, val) => sum + val, 0) / lengths.length;
  const variance = lengths.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / lengths.length;
  const stdDev = Math.sqrt(variance);

  // A higher standard deviation means more varied sentence length (more human-like)
  // Low standard deviation < 3 might indicate robotic output.
  let label = "High variance (Good)";
  if (stdDev < 2.5) label = "Very uniform (Robotic)";
  else if (stdDev < 4.5) label = "Moderate variance";

  return { stdDev: parseFloat(stdDev.toFixed(2)), mean: parseFloat(mean.toFixed(2)), label };
}

export function checkGenericPhrases(text: string) {
  const matches: { phrase: string; index: number }[] = [];
  const lowerText = text.toLowerCase();
  
  genericPhrases.forEach(phrase => {
    const idx = lowerText.indexOf(phrase);
    if (idx !== -1) {
      matches.push({ phrase, index: idx });
    }
  });
  
  return matches;
}
