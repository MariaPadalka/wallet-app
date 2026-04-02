export function DailyPointsCard({ displayLabel }: { displayLabel: string }) {
  return (
    <div
      className="row-start-2 col-start-1 flex flex-col rounded-2xl bg-white p-4 dark:bg-zinc-900"
      aria-labelledby="daily-points-heading"
    >
      <h2
        id="daily-points-heading"
        className="text-sm font-semibold text-zinc-600 dark:text-zinc-400"
      >
        Daily Points
      </h2>
      <p className="mt-2 text-sm font-medium tabular-nums text-zinc-500 dark:text-zinc-400">
        {displayLabel}
      </p>
    </div>
  )
}
