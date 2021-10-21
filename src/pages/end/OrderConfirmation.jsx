import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import Button from 'react-bootstrap/Button'

const OrderConfirmation = () => {
  const [orderDetails, updateItemCount] = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`, orderDetails)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => console.error(error))
  }, [orderDetails])

  return (
    <>
      <h2>Thank you!</h2>
      <h3>Your order number is {orderNumber}</h3>
      <p>Thanks for your purchase</p>
      <Button variant="primary">Create new order</Button>
    </>
  )
}

export default OrderConfirmation
