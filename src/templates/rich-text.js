import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"

import { graphql, getModule, Link } from "gatsby"
import Layout from "../components/layout"

const componentRenderer = node => {
  const Component = getModule(node.moduleID)

  if (Component) {
    return <Component node={node} fields={node?.data?.target?.fields} />
  }

  return <div>No mapping</div>
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: componentRenderer,
    [INLINES.EMBEDDED_ENTRY]: componentRenderer,
    [INLINES.ENTRY_HYPERLINK]: (node, children) => (
      <Link to={`/${node.data.target.fields.slug ?? ``}`}>{children}</Link>
    ),
  },
}

const renderer = document => documentToReactComponents(document, options)

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
  query RichTextTemplateQuery($slug: String!) {
    contentfulPageBuilder(slug: { eq: $slug }) {
      title
      richText {
        jsonButWithComponents
      }
    }
  }
`
