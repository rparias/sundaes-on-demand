import { fireEvent, render, screen } from '@testing-library/react'
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
      fireEvent.click(checkbox)
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
      fireEvent.click(checkbox)
      expect(confirmButton).toBeEnabled()
      fireEvent.click(checkbox)
      expect(confirmButton).toBeDisabled()
    })
  })
})
