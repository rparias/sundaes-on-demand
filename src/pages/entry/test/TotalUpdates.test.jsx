import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

describe('Subtotals', () => {
  test('update scoop subtotal when soops change', async () => {
    render(<Options optionType="scoops" />)

    // make sure total starts out $0.00
    const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopSubtotal).toHaveTextContent('0.00')

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    expect(scoopSubtotal).toHaveTextContent('2.00')

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '2')
    expect(scoopSubtotal).toHaveTextContent('6.00')
  })

  test('update toppings subtotal when toppings change', async () => {
    render(<Options optionType="toppings" />)

    // make sure total starts out $0.00
    const toppingSubtotal = screen.getByText('Toppings total: $', {
      exact: false,
    })
    expect(toppingSubtotal).toHaveTextContent('0.00')

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: /hot fudge/i,
    })
    expect(hotFudgeCheckbox).not.toBeChecked()

    userEvent.click(hotFudgeCheckbox)
    expect(toppingSubtotal).toHaveTextContent('1.50')

    userEvent.click(hotFudgeCheckbox)
    expect(toppingSubtotal).toHaveTextContent('0.00')

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    })
    userEvent.click(cherriesCheckbox)
    expect(toppingSubtotal).toHaveTextContent('1.50')

    const mAndMsCheckbox = await screen.findByRole('checkbox', {
      name: /M&Ms/i,
    })
    userEvent.click(mAndMsCheckbox)
    expect(toppingSubtotal).toHaveTextContent('3.00')

    userEvent.click(cherriesCheckbox)
    expect(toppingSubtotal).toHaveTextContent('1.50')
  })
})

describe('Grand Total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />)

    const grandTotalLabel = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })

    expect(grandTotalLabel).toHaveTextContent('0.00')

    const vanillaScoopInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    })
    userEvent.clear(vanillaScoopInput)
    userEvent.type(vanillaScoopInput, '2')

    const cherriesToppingCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    })
    userEvent.click(cherriesToppingCheckbox)

    expect(grandTotalLabel).toHaveTextContent('5.50')
  })
  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />)

    const cherriesToppingCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    })
    userEvent.click(cherriesToppingCheckbox)
    const mAndMsToppingCheckbox = await screen.findByRole('checkbox', {
      name: /m&ms/i,
    })
    userEvent.click(mAndMsToppingCheckbox)

    const chocolateScoopInput = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    })
    userEvent.clear(chocolateScoopInput)
    userEvent.type(chocolateScoopInput, '1')

    const grandTotalLabel = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })

    expect(grandTotalLabel).toHaveTextContent('5.00')
  })
  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />)

    const vanillaScoopInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    })
    userEvent.clear(vanillaScoopInput)
    userEvent.type(vanillaScoopInput, '1')

    const chocolateScoopInput = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    })
    userEvent.clear(chocolateScoopInput)
    userEvent.type(chocolateScoopInput, '2')

    const cherriesToppingCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    })
    userEvent.click(cherriesToppingCheckbox)

    const grandTotalLabel = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })

    expect(grandTotalLabel).toHaveTextContent('7.50')

    userEvent.clear(chocolateScoopInput)
    userEvent.type(chocolateScoopInput, '0')
    expect(grandTotalLabel).toHaveTextContent('3.50')
  })
})
