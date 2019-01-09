const {GraphQLServer} = require('graphql-yoga');
const path = require('path');

const links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for graphql'
}]

const resolvers = {
  Query: {
    info: () => `This is the API of a hackernews clone`,
    feed: () => links,
  },
}

const relativePath = path.basename(__dirname);
const server = new GraphQLServer({
    typeDefs: `./${relativePath}/graphql/schema.graphql`,
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));