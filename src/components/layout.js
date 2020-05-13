import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import "./reset.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      allContentfulPageBuilder {
        nodes {
          title
          slug
        }
      }
    }
  `)

  return (
    <div
      style={{
        margin: "0 1rem",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <header>
        <h1>Demo of data-driven code-splitting using Contentful</h1>
      </header>
      <main
        style={{
          flexGrow: 1,
        }}
      >
        {children}
      </main>

      <footer>
        <h4>Links:</h4>
        <nav>
          <h5>Pages using rich text</h5>
          <ul>
            {data.allContentfulPageBuilder.nodes.map(({ title, slug }) => (
              <li>
                <Link to={`/${slug}`}>{title}</Link> (<code>{`/${slug}`}</code>)
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  )
}

export default Layout
