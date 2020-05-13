import React from "react"
import { graphql } from "gatsby"
import renderer from "../components/renderer"

const IndexPage = ({ data }) => {
  return (
    <>
      <h1>{data.contentfulPageBuilder.title}</h1>
      {renderer(data.contentfulPageBuilder.richText.jsonButWithComponents)}
    </>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query TemplateQuery($slug: String!) {
    contentfulPageBuilder(slug: { eq: $slug }) {
      title
      richText {
        jsonButWithComponents
      }
    }
  }
`
