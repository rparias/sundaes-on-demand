import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SummaryForm = () => {
  const [tcChecked, setTcChecked] = useState(false)

  const handleOnChange = ({ target: { checked } }) => {
    setTcChecked(checked)
  }

  const checkboxLabel = <label>I agree to Terms and Conditions</label>

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
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  )
}

export default SummaryForm
