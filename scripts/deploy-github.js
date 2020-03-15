const ghpages = require('gh-pages')

// replace with your repo url
ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://github.com/karthick3018/gatsby-corona',
  },
  () => {
    console.log('Deploy Complete!')
  }
)