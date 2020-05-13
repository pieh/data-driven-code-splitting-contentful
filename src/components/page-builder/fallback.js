import React from "react"

const Fallback = ({ node }) => {
  return (
    <div>
      Have no component for{" "}
      {node?.data?.target?.sys?.contentType?.sys?.contentful_id}
    </div>
  )
}

export default Fallback
