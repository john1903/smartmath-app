export function splitMathString(str: string): string[] {
  const regex = /(\${1,2}.*?\${1,2})/g;
  return str.split(regex).filter(Boolean);
}

export function normalizeLatex(str: string): string {
  return str.replace(/\\\\/g, "\\");
}

export const getDateRange = (
  daysBack: number = 30
): { from: string; to: string } => {
  const now = new Date();

  const toDate = new Date(now.getTime() - 5 * 60 * 1000);

  const fromDate = new Date();
  fromDate.setDate(now.getDate() - daysBack);

  const format = (d: Date): string => d.toISOString().slice(0, 19);

  return {
    from: format(fromDate),
    to: format(toDate),
  };
};
