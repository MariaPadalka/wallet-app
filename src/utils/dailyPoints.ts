/**
 * Meteorological seasons (Northern Hemisphere):
 * Spring Mar–May, Summer Jun–Aug, Fall Sep–Nov, Winter Dec–Feb.
 *
 * Day 1 of season: 2 pts; Day 2: 3 pts; Day n≥3: round( P(n-2) + 0.6 × P(n-1) ).
 */

const MS_PER_DAY = 86_400_000

function startOfUtcDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

/** First day of the meteorological season that contains `date` (UTC calendar). */
export function getSeasonStartUtc(date: Date): Date {
  const y = date.getUTCFullYear()
  const m = date.getUTCMonth() + 1

  if (m >= 3 && m <= 5) return new Date(Date.UTC(y, 2, 1))
  if (m >= 6 && m <= 8) return new Date(Date.UTC(y, 5, 1))
  if (m >= 9 && m <= 11) return new Date(Date.UTC(y, 8, 1))
  if (m === 12) return new Date(Date.UTC(y, 11, 1))
  return new Date(Date.UTC(y - 1, 11, 1))
}

/** 1-based index: first day of season = 1. */
export function getDayOfSeasonUtc(date: Date): number {
  const start = startOfUtcDay(getSeasonStartUtc(date))
  const day = startOfUtcDay(date)
  const diffDays = Math.floor((day.getTime() - start.getTime()) / MS_PER_DAY)
  return diffDays + 1
}

function pointsForDayOfSeason(dayOfSeason: number): number {
  if (dayOfSeason <= 1) return 2
  if (dayOfSeason === 2) return 3

  const seq: number[] = [2, 3]
  for (let d = 3; d <= dayOfSeason; d++) {
    const prev = seq[d - 2]
    const prevPrev = seq[d - 3]
    seq.push(Math.round(prevPrev + 0.6 * prev))
  }
  return seq[dayOfSeason - 1]
}

/** Raw points for “today” (same rules as spec). */
export function getDailyPointsForDate(reference: Date = new Date()): number {
  const day = getDayOfSeasonUtc(reference)
  return pointsForDayOfSeason(day)
}
