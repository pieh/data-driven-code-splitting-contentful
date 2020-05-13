import React from "react"

const MediaObject = ({ fields }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40px auto",
        gridTemplateRows: "auto",
        columnGap: "15px",
        gridTemplateAreas: `
         "image header"
         "image content" 
        `,
      }}
    >
      <img
        src={fields.image.fields.file.url}
        style={{ display: "block", width: 40, gridArea: "image" }}
        alt={fields.image.fields.description}
      />
      <h3 style={{ margin: "0 0 10px", gridArea: "header" }}>
        {fields.heading}
      </h3>
      <div style={{ gridArea: "content" }}>{fields.content}</div>
    </div>
  )
}

export default MediaObject
