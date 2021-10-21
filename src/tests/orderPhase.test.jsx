import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('order flow for happy path', async () => {
  //---------------- render app ---------------- //
  render(<App />)

  // ---------------- add ice cream scoops and toppings ---------------- //
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '1')

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  })
  const mAndMsCheckbox = await screen.findByRole('checkbox', { name: /m&ms/i })
  userEvent.click(cherriesCheckbox)
  userEvent.click(mAndMsCheckbox)

  //---------------- find and click order button ---------------- //
  const orderButton = screen.getByRole('button', { name: /continue order/i })
  userEvent.click(orderButton)

  //---------------- check summary information based on order ---------------- //
  const orderSummaryTitle = screen.getByRole('heading', {
    name: /order summary/i,
  })
  expect(orderSummaryTitle).toBeInTheDocument()

  const scoopsLabel = screen.getByText('Scoops: $', { exact: false })
  expect(scoopsLabel).toHaveTextContent('2.00')

  const sundaeItems = screen.queryAllByRole('listitem')
  expect(sundaeItems.length).toBe(3)

  const toppingsLabel = screen.getByText('Toppings: $', { exact: false })
  expect(toppingsLabel).toHaveTextContent('3.00')

  const totalLabel = screen.getByText('Total: $', { exact: false })
  expect(totalLabel).toHaveTextContent('5.00')

  //---------------- accept terms and conditions and click button to confirm order ---------------- //
  const termsAndConditions = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i,
  })
  userEvent.click(termsAndConditions)

  const confirmButton = screen.getByRole('button', { name: /confirm order/i })
  userEvent.click(confirmButton)

  //---------------- confirm order number on confirmation page ---------------- //
  await waitFor(async () => {
    const orderNumber = await screen.findByText('Your order number is', {
      exact: false,
    })
    expect(orderNumber).toHaveTextContent('1234567890')
  })

  //---------------- click "new order" button on confirmation page ---------------- //
  const newOrderButton = screen.getByRole('button', {
    name: /create new order/i,
  })
  userEvent.click(newOrderButton)

  //---------------- check that scoops and toppings subtotals have been reset ---------------- //
  const scoopsLabelReset = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsLabelReset).toHaveTextContent('0.00')

  const toppingsLabelReset = screen.getByText('Toppings total: $', {
    exact: false,
  })
  expect(toppingsLabelReset).toHaveTextContent('0.00')

  const grandTotal = screen.getByText('Grand total: $', {
    exact: false,
  })
  expect(grandTotal).toHaveTextContent('0.00')

  //---------------- do we need to await anything to avoid test errors? ---------------- //
  // wait for items to appear so that Testing Library doesn't get angry about that
  await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  })
  await screen.findByRole('checkbox', {
    name: /cherries/i,
  })
  await screen.findByRole('checkbox', {
    name: /m&ms/i,
  })
})
