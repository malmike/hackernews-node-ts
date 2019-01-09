const {GraphQLServer} = require('graphql-yoga');
const path = require('path');

var links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for graphql'
}]

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a hackernews clone`,
    feed: () => links,
  },
  Mutation: {
    postLink: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      var updatedLink = {}
      links = links.map(link => {
        if(link.id === args.id){
          link.description = args.description? args.description : link.description;
          link.url = args.url? args.url : link.url;
          updatedLink = link;
        }
        return link;
      })
      return updatedLink;
    },
    deleteLink: (parent, args) => {
      const index = links.indexOf(
        links.filter(link => link.id === args.id)[0]
      )
      if(index > -1){
        links.splice(index, 1)
      }
    }
  }
}

const relativePath = path.basename(__dirname);
const server = new GraphQLServer({
    typeDefs: `./${relativePath}/graphql/schema.graphql`,
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));