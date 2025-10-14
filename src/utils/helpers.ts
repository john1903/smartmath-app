// export function splitMathString(str) {
//   // Match $...$ or $$...$$
//   const regex = /(\${1,2}.*?\${1,2})/g;
//   return str.split(regex).filter(Boolean);
// }

// export function normalizeLatex(str) {
//   return str.replace(/\\\\/g, "\\"); // convert \\frac → \frac
// }

// export const getDateRange = (daysBack = 30) => {
//   const now = new Date();

//   // subtract 5 minutes for "to"
//   const toDate = new Date(now.getTime() - 5 * 60 * 1000);

//   // subtract days for "from"
//   const fromDate = new Date();
//   fromDate.setDate(now.getDate() - daysBack);

//   // format into "yyyy-MM-ddTHH:mm:ss" (Spring-friendly ISO, no ms, no Z)
//   const format = (d) => d.toISOString().slice(0, 19);

//   return {
//     from: format(fromDate),
//     to: format(toDate),
//   };
// };

export function splitMathString(str: string): string[] {
  // Match $...$ or $$...$$
  const regex = /(\${1,2}.*?\${1,2})/g;
  return str.split(regex).filter(Boolean);
}

export function normalizeLatex(str: string): string {
  // convert \\frac → \frac
  return str.replace(/\\\\/g, "\\");
}

export const getDateRange = (
  daysBack: number = 30
): { from: string; to: string } => {
  const now = new Date();

  // subtract 5 minutes for "to"
  const toDate = new Date(now.getTime() - 5 * 60 * 1000);

  // subtract days for "from"
  const fromDate = new Date();
  fromDate.setDate(now.getDate() - daysBack);

  // format into "yyyy-MM-ddTHH:mm:ss" (Spring-friendly ISO, no ms, no Z)
  const format = (d: Date): string => d.toISOString().slice(0, 19);

  return {
    from: format(fromDate),
    to: format(toDate),
  };
};
