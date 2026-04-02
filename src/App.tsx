import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const TransactionsList = lazy(() =>
  import('@/pages/TransactionsList').then((m) => ({
    default: m.TransactionsList,
  })),
)

const TransactionDetail = lazy(() =>
  import('@/pages/TransactionDetail').then((m) => ({
    default: m.TransactionDetail,
  })),
)

function PageFallback() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#F2F2F7] text-sm text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<TransactionsList />} />
        <Route
          path="/transaction/:transactionId"
          element={<TransactionDetail />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
