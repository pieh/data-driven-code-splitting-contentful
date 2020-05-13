import React from "react"
import { graphql, getModule } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <h2>{data.contentfulReferencePageBuilder.title}</h2>
      {data.contentfulReferencePageBuilder.elements.map(
        ({ moduleID, ...rest }) => {
          if (!moduleID) {
            return null
          }
          const Component = getModule(moduleID)

          return <Component referenceFields={rest} />
        }
      )}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query ReferenceTemplateQuery($slug: String!) {
    contentfulReferencePageBuilder(slug: { eq: $slug }) {
      title
      elements {
        ... on ContentfulListGroup {
          moduleID
          ...ListGroupFragment
        }
        ... on ContentfulSlugWtf {
          moduleID
          ...SlugWTFFragment
        }
        ... on ContentfulMeme {
          moduleID
          ...MemeFragment
        }
        ... on ContentfulMediaObject {
          moduleID
          ...MediaObjectFragment
        }
      }
    }
  }
`
