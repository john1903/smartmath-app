// utils/timeTracker.js

let startTime = null;

/**
 * Start the timer
 */
export const startTimer = () => {
  startTime = Date.now();
};

/**
 * Stop the timer and return ISO-8601 duration (PTxMxS)
 */
export const stopTimer = () => {
  if (!startTime) return "PT0S"; // fallback if not started

  const endTime = Date.now();
  const elapsedMs = endTime - startTime;
  const elapsedSec = Math.floor(elapsedMs / 1000);

  return convertToISO8601(elapsedSec);
};

/**
 * Convert seconds to ISO-8601 duration
 * e.g. 135 → "PT2M15S"
 */
const convertToISO8601 = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  let iso = "PT";
  if (minutes > 0) iso += `${minutes}M`;
  if (seconds > 0) iso += `${seconds}S`;

  return iso;
};
