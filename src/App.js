import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/OrderEntry'
import { OrderDetailsProvider } from './contexts/OrderDetails'

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page needs provider */}
        <OrderEntry />
        {/* Confirmation page does not need provider */}
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
