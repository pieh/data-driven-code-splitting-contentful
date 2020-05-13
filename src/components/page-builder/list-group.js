import React from "react"
import { graphql } from "gatsby"

const ListGroup = ({ fields, referenceFields }) => {
  const items = fields?.items ?? referenceFields?.items

  return (
    <ul>
      {(items || []).map(item => (
        <li>{item}</li>
      ))}
    </ul>
  )
}

export default ListGroup

export const fragment = graphql`
  fragment ListGroupFragment on ContentfulListGroup {
    items
  }
`
