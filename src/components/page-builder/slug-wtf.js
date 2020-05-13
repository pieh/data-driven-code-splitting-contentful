import React from "react"
import slug from "slug"

const preStyle = {
  background: `#EEE`,
}

const SlugWTF = ({ fields }) => {
  return (
    <div>
      <label>Input</label>
      <pre style={preStyle}>{fields.text}</pre>
      <label>Output</label>
      <pre style={preStyle}>{slug(fields.text)}</pre>
    </div>
  )
}

export default SlugWTF
