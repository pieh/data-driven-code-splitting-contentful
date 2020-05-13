import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

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

const Meme = ({ fields, referenceFields }) => {
  const topLine = fields?.topLine ?? referenceFields?.topLine
  const bottomLine = fields?.bottomLine ?? referenceFields?.bottomLine

  return (
    <div
      style={{
        width: 500,
        height: 500,
        display: "grid",
        gridTemplateRows: "[start] 1fr 1fr [end]",
        gridTemplateColumns: "auto",
        gridTemplateAreas: `
         "top"
         "bottom"
        `,
      }}
    >
      {fields?.memeImage?.fields?.file?.url && (
        <img
          src={fields.memeImage.fields.file.url}
          style={{
            width: "100%",
            height: "100%",
            gridColumn: 1,
            gridRow: "start / end",
          }}
          alt={fields.memeImage.fields.description}
        />
      )}
      {referenceFields?.memeImage?.fixed && (
        <Image
          style={{
            width: "100%",
            height: "100%",
            gridColumn: 1,
            gridRow: "start / end",
            zIndex: -1,
          }}
          fixed={referenceFields.memeImage.fixed}
          alt={referenceFields.memeImage.description}
        />
      )}
      <div
        style={{
          gridArea: "top",
          alignItems: "flex-start",
          ...textStyle,
        }}
      >
        {topLine}
      </div>
      <div style={{ gridArea: "bottom", alignItems: "flex-end", ...textStyle }}>
        {bottomLine}
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

export const fragment = graphql`
  fragment MemeFragment on ContentfulMeme {
    topLine
    bottomLine
    memeImage {
      description
      fixed(width: 500, height: 500) {
        ...GatsbyContentfulFixed
      }
    }
  }
`
