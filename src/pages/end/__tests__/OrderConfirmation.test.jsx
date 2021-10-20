import { render, screen } from '../../../test-utils/testing-library-utils'
import OrderConfirmation from '../OrderConfirmation'

test('Initial values should be displayed on the screen', () => {
  render(<OrderConfirmation />)

  const thanksLabel = screen.getByRole('heading', { name: /thank you!/i })
  expect(thanksLabel).toBeInTheDocument()

  const orderNumberLabel = screen.getByText('Your order number is', {
    exact: false,
  })
  expect(orderNumberLabel).toBeInTheDocument()

  const message = screen.getByText('Thanks for your', { exact: false })
  expect(message).toBeInTheDocument()

  const newOrderButton = screen.getByRole('button', {
    name: /create new order/i,
  })
  expect(newOrderButton).toBeEnabled()
})
