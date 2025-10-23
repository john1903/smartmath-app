export function splitMathString(str: string): string[] {
  const regex = /(\${1,2}.*?\${1,2})/g;
  return str.split(regex).filter(Boolean);
}

// export function normalizeLatex(str: string): string {
//   return str.replace(/\\\\/g, "\\");
// }

export function normalizeLatex(str: string): string {
  return (
    str
      // fix escaped backslashes
      .replace(/\\\\/g, "\\")

      // replace \log with operatorname to ensure proper spacing before subscript
      .replace(/\\log(?![a-zA-Z])/g, "\\operatorname{log}")

      // add thin space after operator for readability (like log x)
      .replace(
        /\\operatorname\{log\}([a-zA-Z0-9])/g,
        "\\operatorname{log}\\, $1"
      )

      // also handle ln, sin, cos, tan for consistency
      .replace(/\\ln([a-zA-Z0-9])/g, "\\ln\\, $1")
      .replace(/\\sin([a-zA-Z0-9])/g, "\\sin\\, $1")
      .replace(/\\cos([a-zA-Z0-9])/g, "\\cos\\, $1")
      .replace(/\\tan([a-zA-Z0-9])/g, "\\tan\\, $1")
  );
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
