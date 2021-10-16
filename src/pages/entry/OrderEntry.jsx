import React from 'react'
import Options from './Options'
import { useOrderDetails } from '../../contexts/OrderDetails'

const OrderEntry = () => {
  const [orderDetails, updateItemCount] = useOrderDetails()

  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </>
  )
}

export default OrderEntry
