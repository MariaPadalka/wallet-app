/** e.g. 28745 → "29K"; values ≤ 1000 stay numeric string. */
export function formatPointsForDisplay(points: number): string {
  if (points <= 1000) return String(points)
  return `${Math.round(points / 1000)}K`
}
