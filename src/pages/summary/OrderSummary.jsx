import React, { useEffect, useState } from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import SummaryForm from './SummaryForm'

const OrderSummary = () => {
  const [orderDetails, updateItemCount] = useOrderDetails()
  const {
    totals: { scoops, toppings, grandTotal },
    scoops: scoopsMap,
    toppings: toppingsMap,
  } = orderDetails

  return (
    <>
      <h2>Scoops: {scoops}</h2>
      <ul></ul>
      <h2>Toppings: {toppings}</h2>
      <ul></ul>
      <h2>Total: {grandTotal}</h2>
      <SummaryForm />
    </>
  )
}

export default OrderSummary
