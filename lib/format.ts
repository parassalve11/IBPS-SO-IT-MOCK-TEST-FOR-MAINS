export function formatTime(totalSeconds: number) {
  const boundedSeconds = Math.max(totalSeconds, 0);
  const hours = Math.floor(boundedSeconds / 3600);
  const minutes = Math.floor((boundedSeconds % 3600) / 60);
  const seconds = boundedSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export function formatDuration(minutes: number) {
  return `${minutes} mins`;
}

export function formatPercentage(value: number) {
  return `${value.toFixed(2)}%`;
}
