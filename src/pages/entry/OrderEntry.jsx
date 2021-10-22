import React from 'react'
import Options from './Options'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../contexts/OrderDetails'

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails()

  const handleOnClick = () => {
    setOrderPhase('review')
  }

  return (
    <>
      <h1>Design your sundae</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button variant="primary" onClick={handleOnClick}>
        Continue Order
      </Button>
    </>
  )
}

export default OrderEntry
