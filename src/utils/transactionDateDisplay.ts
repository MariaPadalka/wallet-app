const MS_PER_DAY = 86_400_000

function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/**
 * Last 7 calendar days (including today): weekday name (e.g. "Thursday").
 * Older: full date in `en-US` (e.g. "Mar 15, 2026").
 */
export function formatTransactionDateLabel(
  isoDate: string,
  reference: Date = new Date(),
): string {
  const tx = new Date(isoDate)
  const refStart = startOfLocalDay(reference).getTime()
  const txStart = startOfLocalDay(tx).getTime()
  const daysAgo = Math.floor((refStart - txStart) / MS_PER_DAY)

  if (daysAgo >= 0 && daysAgo < 7) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(tx)
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(tx)
}
