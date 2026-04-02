import { Navigate, Route, Routes } from 'react-router-dom'
import { TransactionDetail } from '@/pages/TransactionDetail'
import { TransactionsList } from '@/pages/TransactionsList'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TransactionsList />} />
      <Route
        path="/transaction/:transactionId"
        element={<TransactionDetail />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
