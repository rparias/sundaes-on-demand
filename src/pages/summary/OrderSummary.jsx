import { useOrderDetails } from '../../contexts/OrderDetails'
import SummaryForm from './SummaryForm'

const OrderSummary = () => {
  const [orderDetails, updateItemCount] = useOrderDetails()
  const {
    totals: { scoops, toppings, grandTotal },
    scoops: scoopsMap,
    toppings: toppingsMap,
  } = orderDetails

  const listScoops = []
  const listToppings = []

  scoopsMap.forEach((name, quantity) => {
    listScoops.push([`${name} ${quantity}`])
  })

  toppingsMap.forEach((name, quantity) => {
    listToppings.push([`${name} ${quantity}`])
  })

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {scoops}</h2>
      <ul>
        {listScoops.map((scoop) => (
          <li>{scoop}</li>
        ))}
      </ul>
      <h2>Toppings: {toppings}</h2>
      <ul>
        {listToppings.map((topping) => (
          <li>{topping}</li>
        ))}
      </ul>
      <h2>Total: {grandTotal}</h2>
      <SummaryForm />
    </>
  )
}

export default OrderSummary
