import { render, screen } from '../../../test-utils/testing-library-utils'
import OrderSummary from '../OrderSummary'

describe('OrderSummary component', () => {
  it('Should display zero when there are no items in the order', () => {
    render(<OrderSummary />)
    const scoopsLabel = screen.getByText('Scoops: $', { exact: false })
    expect(scoopsLabel).toHaveTextContent('0.00')

    const scoopList = screen.queryAllByRole('list')
    expect(scoopList.length).toBe(2)

    const scoopItems = screen.queryAllByRole('listitem')
    expect(scoopItems.length).toBe(0)

    const toppingsLabel = screen.getByText('Toppings: $', { exact: false })
    expect(toppingsLabel).toHaveTextContent('0.00')

    const totalLabel = screen.getByText('Total: $', { exact: false })
    expect(totalLabel).toHaveTextContent('0.00')
  })
})
