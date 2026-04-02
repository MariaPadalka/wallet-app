import type { CardBalanceSummary, DailyPointsSummary } from '@/data/loadWalletData'
import { CardBalanceCard } from '@/components/CardBalanceCard'
import { DailyPointsCard } from '@/components/DailyPointsCard'
import { NoPaymentDueCard } from '@/components/NoPaymentDueCard'

export function AccountSummaryGrid({
  card,
  dailyPoints,
  noPaymentDueMessage,
}: {
  card: CardBalanceSummary
  dailyPoints: DailyPointsSummary
  noPaymentDueMessage: string
}) {
  return (
    <section
      className="mb-6 grid grid-cols-2 gap-3 auto-rows-auto"
      aria-label="Account summary"
    >
      <CardBalanceCard
        balanceUsd={card.cardBalanceUsd}
        availableUsd={card.availableUsd}
      />
      <DailyPointsCard displayLabel={dailyPoints.displayLabel} />
      <NoPaymentDueCard message={noPaymentDueMessage} />
    </section>
  )
}
