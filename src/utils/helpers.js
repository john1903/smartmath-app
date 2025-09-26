export function splitMathString(str) {
  // Match $...$ or $$...$$
  const regex = /(\${1,2}.*?\${1,2})/g;
  return str.split(regex).filter(Boolean);
}

export function normalizeLatex(str) {
  return str.replace(/\\\\/g, "\\"); // convert \\frac → \frac
}
