module.exports = {
  siteMetadata: {
    title: `Karthick's Gatsby`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    pathPrefix: "/gatsby-corona",
  },
  plugins: [
    {
      resolve:'gatsby-source-contentful',
      options: {
        // spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        // accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN
        spaceId:"9ape0xezaxv3",
        accessToken: "FXIuKiDp6R0Wye1XcI2x9zAuYCIA5K0OT1TJIc8wGPs"
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
