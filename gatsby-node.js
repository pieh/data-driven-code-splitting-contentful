exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    {
      allContentfulPageBuilder {
        nodes {
          slug
        }
      }
      allContentfulReferencePageBuilder {
        nodes {
          title
          slug
        }
      }
    }
  `)

  data.allContentfulPageBuilder.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: require.resolve(`./src/templates/rich-text.js`),
      context: { slug },
    })
  })

  data.allContentfulReferencePageBuilder.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: require.resolve(`./src/templates/reference.js`),
      context: { slug },
    })
  })
}

// this could be in gatsby-source-contentful and mapping could be plugin options
const pageBuilderMapping = require(`./page-builder-mapping`)
const _ = require(`lodash`)

const traverseFields = fields => {
  return Object.entries(fields).reduce((acc, [key, value]) => {
    const field = (acc[key] = value["en-US"])

    if (_.isPlainObject(field) && field.fields) {
      field.fields = traverseFields(field.fields)
    }

    return acc
  }, {})
}

const traverse = (node, walkFn) => {
  walkFn(node)
  if (node.content) {
    node.content.forEach(child => traverse(child, walkFn))
  }
  if (node.data && node.data.target && node.data.target.fields) {
    node.data.target.fields = traverseFields(node.data.target.fields)

    // .forEach()
  }

  return node
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: `ContentfulPageBuilder`,
      fields: {
        slug: {
          type: `String!`,
          resolve: source => {
            return source.slug || ``
          },
        },
      },
      interfaces: [`Node`],
    }),
  ])
}

// copied from contentful plugin
const typePrefix = `Contentful`
const makeTypeName = type => _.upperFirst(_.camelCase(`${typePrefix} ${type}`))

exports.createResolvers = ({ createResolvers }) => {
  let resolvers = {
    contentfulPageBuilderRichTextRichTextNode: {
      jsonButWithComponents: {
        type: `JSON`,
        resolve(source, args, context) {
          const contentJSON = JSON.parse(source.internal.content)
          return traverse(contentJSON, contentfulNode => {
            // likely will want separate mapping for those but for testing it's good enough
            if (
              contentfulNode.nodeType === `embedded-entry-block` ||
              contentfulNode.nodeType === `embedded-entry-inline`
            ) {
              const contentType =
                contentfulNode.data.target.sys.contentType.sys.contentful_id

              let mappedComponentPath = pageBuilderMapping[contentType]
              if (!mappedComponentPath && pageBuilderMapping._) {
                mappedComponentPath = pageBuilderMapping._
              }

              if (mappedComponentPath) {
                const resolvedPath = require.resolve(mappedComponentPath)
                // yikes - we should not mutate, but rather create copy - something to think about
                contentfulNode.moduleID = context.addModuleDependency({
                  source: resolvedPath,
                })
              }
            }
          })
        },
      },
    },
  }

  resolvers = Object.entries(pageBuilderMapping).reduce(
    (acc, [type, componentPath]) => {
      if (type === `_`) {
        // skip fallback used for rich context
        return acc
      }

      const GraphQLTypeName = makeTypeName(type)
      acc[GraphQLTypeName] = {
        moduleID: {
          type: `String!`,
          resolve(_, _2, context) {
            return context.addModuleDependency({
              source: require.resolve(componentPath),
            })
          },
        },
      }

      return acc
    },
    resolvers
  )

  createResolvers(resolvers)
}
