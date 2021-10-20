import React from 'react'
import Button from 'react-bootstrap/Button'

const OrderConfirmation = () => {
  return (
    <>
      <h2>Thank you!</h2>
      <h3>Your order number is</h3>
      <p>Thanks for your purchase</p>
      <Button variant="primary">Create new order</Button>
    </>
  )
}

export default OrderConfirmation
