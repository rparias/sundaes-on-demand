import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleOnChange = ({ target: { checked } }) => {
    updateItemCount(name, checked ? 1 : 0)
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: '75%' }}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          id={`${name}-checkbox`}
          label={name}
          onChange={handleOnChange}
        />
      </Form.Group>
    </Col>
  )
}

export default ToppingOption
