import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/end/OrderConfirmation'
import { OrderDetailsProvider } from './contexts/OrderDetails'

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress')
  let OrderPhase = OrderEntry

  switch (orderPhase) {
    case 'inProgress':
      OrderPhase = OrderEntry
      break
    case 'review':
      OrderPhase = OrderSummary
      break
    case 'complete':
      OrderPhase = OrderConfirmation
      break
    default:
      OrderPhase = OrderEntry
      break
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <OrderPhase setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
