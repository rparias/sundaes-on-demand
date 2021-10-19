import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import Row from 'react-bootstrap/Row'
import AlertBanner from '../common/AlertBanner'
import { convertFirstLetterToUpperCase, formatCurrency } from '../../utils'
import { pricePerItem } from '../../constants'
import { useOrderDetails } from '../../contexts/OrderDetails'

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const [orderDetails, updateItemCount] = useOrderDetails()

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true))
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
  const title = convertFirstLetterToUpperCase(optionType)

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) => {
        updateItemCount(itemName, newItemCount, optionType)
      }}
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}

export default Options
