import React from "react"
import Image from "gatsby-image"

const MediaObject = ({ fields, referenceFields }) => {
  const heading = fields?.heading ?? referenceFields?.heading
  const content = fields?.content ?? referenceFields?.content?.content

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
      {referenceFields?.image?.fixed && (
        <Image
          style={{ gridArea: "image" }}
          fixed={referenceFields.image.fixed}
          alt={referenceFields.image.description}
        />
      )}
      {fields?.image?.fields?.file?.url && (
        <img
          src={fields.image.fields.file.url}
          style={{ display: "block", width: 40, gridArea: "image" }}
          alt={fields.image.fields.description}
        />
      )}
      <h3 style={{ margin: "0 0 10px", gridArea: "header" }}>{heading}</h3>
      <div style={{ gridArea: "content" }}>{content}</div>
    </div>
  )
}

export default MediaObject

export const fragment = graphql`
  fragment MediaObjectFragment on ContentfulMediaObject {
    heading
    content {
      content
    }
    image {
      description
      fixed(width: 40, height: 40) {
        ...GatsbyContentfulFixed
      }
    }
  }
`
