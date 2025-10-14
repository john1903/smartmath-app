// // utils/timeTracker.js

// let startTime = null;

// export const startTimer = () => {
//   startTime = Date.now();
// };

// export const stopTimer = () => {
//   if (!startTime) return "PT0S";

//   const endTime = Date.now();
//   const elapsedMs = endTime - startTime;
//   const elapsedSec = Math.floor(elapsedMs / 1000);

//   return convertToISO8601(elapsedSec);
// };
// convertToISO8601 = (totalSeconds) => {
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;

//   let iso = "PT";
//   if (minutes > 0) iso += `${minutes}M`;
//   if (seconds > 0) iso += `${seconds}S`;

//   return iso;
// };

let startTime: number | null = null;

export const startTimer = (): void => {
  startTime = Date.now();
};

export const stopTimer = (): string => {
  if (!startTime) return "PT0S";

  const endTime = Date.now();
  const elapsedMs = endTime - startTime;
  const elapsedSec = Math.floor(elapsedMs / 1000);

  return convertToISO8601(elapsedSec);
};

const convertToISO8601 = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  let iso = "PT";
  if (minutes > 0) iso += `${minutes}M`;
  if (seconds > 0) iso += `${seconds}S`;

  return iso;
};
