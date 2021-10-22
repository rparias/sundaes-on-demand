import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { formatCurrency } from '../utils'
import { pricePerItem } from '../constants'

const OrderDetails = createContext()

// create custom hook to check whether we're inside a provider
function useOrderDetails() {
  const context = useContext(OrderDetails)

  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    )
  }

  return context
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0
  for (const count of optionCounts[optionType].values()) {
    optionCount += count
  }

  return optionCount * pricePerItem[optionType]
}

const zeroCurrency = formatCurrency(0)

// create a provider
function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  })
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  })

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts)
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts)
    const grandTotal = scoopsSubtotal + toppingsSubtotal
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    })
  }, [optionCounts])

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts }

      // update option count for this item with the new value on the Map
      const optionCountsMap = optionCounts[optionType]
      newItemCount > 0
        ? optionCountsMap.set(itemName, parseInt(newItemCount))
        : optionCountsMap.delete(itemName)
      setOptionCounts(newOptionCounts)
    }

    function resetValues() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      })
      setTotals({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
      })
    }

    // getter: object containing option counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount, resetValues]
  }, [optionCounts, totals])

  return <OrderDetails.Provider value={value} {...props} />
}

export { useOrderDetails, OrderDetailsProvider }
