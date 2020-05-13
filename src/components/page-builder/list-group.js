import React from "react"

const ListGroup = ({ fields }) => {
  return (
    <ul>
      {(fields?.items || []).map(item => (
        <li>{item}</li>
      ))}
    </ul>
  )
}

export default ListGroup
