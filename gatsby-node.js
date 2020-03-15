/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = ({ actions: { createPage } }) => {
  createPage({
    path: "/checkPg1/",
    component: require.resolve("./src/components/checkPg1.js"),
  })
}