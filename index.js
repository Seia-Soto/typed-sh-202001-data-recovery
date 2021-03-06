const fs = require('fs')

const getPostListOfAuthor = require('./fns/getPostListOfAuthor')
const getPostContent = require('./fns/getPostContent')

const init = async () => {
  const pages = await getPostListOfAuthor('seia')
  const result = []

  for (let i = 0, l = pages.length; i < l; i++) {
    const page = pages[i]

    for (let k = 0, s = page.length; k < s; k++) {
      const post = page[k]

      console.log('recovering contents of', post.title, post.link)

      post.data = await getPostContent(post.link)

      result.push(post)
    }
  }

  fs.writeFileSync('./result.json', JSON.stringify(result), 'utf8')
}

init()
