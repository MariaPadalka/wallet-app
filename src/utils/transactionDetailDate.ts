/** e.g. `4/1/26` — same short US date style everywhere (slashes). */
export function formatTransactionSlashDate(isoDate: string): string {
  const d = new Date(isoDate)
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  }).format(d)
}

/** e.g. `4/1/26, 12:47 PM` — locale US, local timezone. */
export function formatTransactionDetailDateTime(isoDate: string): string {
  const d = new Date(isoDate)
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(d)
}
