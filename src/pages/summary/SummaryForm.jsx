import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const SummaryForm = ({ setOrderPhase }) => {
  const [tcChecked, setTcChecked] = useState(false)

  const handleOnChange = ({ target: { checked } }) => {
    setTcChecked(checked)
  }

  const popover = (
    <Popover id="termsandconditions-popover">
      No ice cream will actually be delivered
    </Popover>
  )

  const checkboxLabel = (
    <label>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </label>
  )

  const handleOnClick = () => {
    setOrderPhase('complete')
  }

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={handleOnChange}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!tcChecked}
        onClick={handleOnClick}
      >
        Confirm order
      </Button>
    </Form>
  )
}

export default SummaryForm
