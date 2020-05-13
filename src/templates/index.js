import React from "react"
import { graphql } from "gatsby"
import renderer from "../components/renderer"
import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <h2>{data.contentfulPageBuilder.title}</h2>
      {renderer(data.contentfulPageBuilder.richText.jsonButWithComponents)}
    </Layout>
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
