import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import OrderConfirmation from '../OrderConfirmation'

test('Initial values should be displayed on the screen', async () => {
  render(<OrderConfirmation />)

  const thanksLabel = await screen.findByRole('heading', {
    name: /thank you!/i,
  })
  expect(thanksLabel).toBeInTheDocument()

  const orderNumberLabel = await screen.findByText('Your order number is', {
    exact: false,
  })
  expect(orderNumberLabel).toBeInTheDocument()

  const message = await screen.findByText('Thanks for your', { exact: false })
  expect(message).toBeInTheDocument()

  const newOrderButton = await screen.findByRole('button', {
    name: /create new order/i,
  })
  expect(newOrderButton).toBeEnabled()
})

test('Order number comming from server should be displayed', async () => {
  render(<OrderConfirmation />)

  await waitFor(async () => {
    const orderNumberLabel = await screen.findByText('Your order number is', {
      exact: false,
    })
    expect(orderNumberLabel).toHaveTextContent('1234567890')
  })
})

test('Loading text should appear if the confirmation number is null', async () => {
  render(<OrderConfirmation />)

  const loadingText = screen.getByRole('heading', { name: /loading/i })
  expect(loadingText).toBeInTheDocument()

  const thanksLabel = await screen.findByRole('heading', {
    name: /thank you!/i,
  })
  expect(thanksLabel).toBeInTheDocument()

  const loadingTextNull = screen.queryByRole('heading', { name: /loading/i })
  expect(loadingTextNull).not.toBeInTheDocument()
})

test('A server error message should appear when it happens', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) =>
      res(ctx.status(500))
    )
  )
  render(<OrderConfirmation />)

  const alert = await screen.findByRole('alert')
  expect(alert).toBeInTheDocument()
})
