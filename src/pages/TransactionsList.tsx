import { useMemo } from 'react'
import { AccountSummaryGrid } from '@/components/AccountSummaryGrid'
import { LatestTransactionsSection } from '@/components/LatestTransactionsSection'
import { loadWalletBootstrap } from '@/data/loadWalletData'

export function TransactionsList() {
  const boot = useMemo(() => loadWalletBootstrap(), [])
  const { config, card, dailyPoints, transactions } = boot

  return (
    <div className="mx-auto min-h-svh max-w-md bg-[#F2F2F7] px-4 pb-10 pt-6 dark:bg-zinc-950">
      <AccountSummaryGrid
        card={card}
        dailyPoints={dailyPoints}
        noPaymentDueMessage={config.noPaymentDueMessage}
      />
      <LatestTransactionsSection transactions={transactions} />
    </div>
  )
}
