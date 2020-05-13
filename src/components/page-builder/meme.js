import React from "react"

const textStyle = {
  display: "flex",
  margin: "10px 0",
  justifyContent: "center",
  fontSize: 40,
  color: "white",
  textTransform: "uppercase",
  fontFamily: "Impact",
  "-webkit-text-stroke-width": "3px",
  "-webkit-text-stroke-color": "black",
}

const Meme = ({ fields }) => {
  return (
    <div
      style={{
        width: 500,
        height: 500,
        display: "grid",
        gridTemplateRows: "[start] 1fr 1fr [end]",
        gridTemplateColumns: "auto",
        // gridTemplateRows: "1fr 1fr",
        // columnGap: "15px",
        gridTemplateAreas: `
         "top"
         "bottom"
        `,
      }}
    >
      <img
        src={fields.memeImage.fields.file.url}
        style={{
          width: "100%",
          height: "100%",
          gridColumn: 1,
          gridRow: "start / end",
        }}
      />
      <div
        style={{
          gridArea: "top",
          alignItems: "start",
          ...textStyle,
        }}
      >
        {fields.topLine}
      </div>
      <div style={{ gridArea: "bottom", alignItems: "end", ...textStyle }}>
        {fields.bottomLine}
      </div>
      {/* <img
        src={fields.image.fields.file.url}
        style={{ display: "block", width: 40, gridArea: "image" }}
      />
      <h3 style={{ margin: "0 0 10px", gridArea: "header" }}>
        {fields.heading}
      </h3>
      <div style={{ gridArea: "content" }}>{fields.content}</div> */}
    </div>
  )
}

export default Meme
