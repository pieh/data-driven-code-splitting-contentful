import React from "react"
import slug from "slug"
import { graphql } from "gatsby"

const preStyle = {
  background: `#EEE`,
}

const SlugWTF = ({ fields, referenceFields }) => {
  const text = fields?.text ?? referenceFields?.text

  return (
    <div>
      <label>Input</label>
      <pre style={preStyle}>{text}</pre>
      <label>Output</label>
      <pre style={preStyle}>{slug(text)}</pre>
    </div>
  )
}

export default SlugWTF

export const fragment = graphql`
  fragment SlugWTFFragment on ContentfulSlugWtf {
    text
  }
`
