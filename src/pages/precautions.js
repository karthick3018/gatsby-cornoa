import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


const GetCoronaPrecautionContent = () => {
  const data = useStaticQuery(graphql`
  query  {
  allContentfulCoronamodal {
    edges {
      node {
        title
        body {
          json
        }
      }
    }
  }
}

`)


  return (
    <div>
      {data && data.allContentfulCoronamodal && data.allContentfulCoronamodal.edges && data.allContentfulCoronamodal.edges.map(eachData => (
        <div>
          <h1>{eachData.node.title}</h1>
          <div>
            {documentToReactComponents(eachData.node.body.json)}
          </div>
        </div>

      ))}
    </div>
  )
}

export default GetCoronaPrecautionContent;


