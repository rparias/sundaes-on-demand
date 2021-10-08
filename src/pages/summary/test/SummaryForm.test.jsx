import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

describe('Summary Form Component', () => {
  describe('Initial conditions', () => {
    it('checkbox is unchecked by default', () => {
      render(<SummaryForm />)
      const checkbox = screen.getByRole('checkbox', {
        name: /i agree to terms and conditions/i,
      })
      expect(checkbox).not.toBeChecked()
    })

    it('button is disabled by default', () => {
      render(<SummaryForm />)
      const confirmButton = screen.getByRole('button', {
        name: /confirm order/i,
      })
      expect(confirmButton).toBeDisabled()
    })
  })

  describe('elements behaviour', () => {
    it('when checkbox is checked it enables the button', () => {
      render(<SummaryForm />)
      const checkbox = screen.getByRole('checkbox', {
        name: /i agree to terms and conditions/i,
      })
      const confirmButton = screen.getByRole('button', {
        name: /confirm order/i,
      })
      userEvent.click(checkbox)
      expect(confirmButton).toBeEnabled()
    })

    it('when checkbox is unchecked it disables the button', () => {
      render(<SummaryForm />)
      const checkbox = screen.getByRole('checkbox', {
        name: /i agree to terms and conditions/i,
      })
      const confirmButton = screen.getByRole('button', {
        name: /confirm order/i,
      })
      userEvent.click(checkbox)
      expect(confirmButton).toBeEnabled()
      userEvent.click(checkbox)
      expect(confirmButton).toBeDisabled()
    })

    it('popover responds to hover', async () => {
      render(<SummaryForm />)
      const POPOVER_MSG = /no ice cream will actually be delivered/i
      const termsAndConditions = screen.getByText(/terms and conditions/i)

      // popover starts out hidden
      const nullPopover = screen.queryByText(POPOVER_MSG)
      expect(nullPopover).not.toBeInTheDocument()

      // popover appears upon mouseover of checkbox label
      userEvent.hover(termsAndConditions)
      const popover = screen.getByText(POPOVER_MSG)
      expect(popover).toBeInTheDocument()

      // popover disappears when we mouse out
      userEvent.unhover(termsAndConditions)
      await waitForElementToBeRemoved(() => screen.queryByText(POPOVER_MSG))
    })
  })
})
