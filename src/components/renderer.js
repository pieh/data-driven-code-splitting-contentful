import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { getModule, Link } from "gatsby"

const renderer = node => {
  const Component = getModule(node.moduleID)

  if (Component) {
    return <Component node={node} fields={node?.data?.target?.fields} />
  }

  return <div>No mapping</div>
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: renderer,
    [INLINES.EMBEDDED_ENTRY]: renderer,
    [INLINES.ENTRY_HYPERLINK]: (node, children) =>
      console.log(node) || (
        <Link to={`/${node.data.target.fields.slug ?? ``}`}>{children}</Link>
      ),
  },
}

const renderRichText = document => documentToReactComponents(document, options)

export default renderRichText
