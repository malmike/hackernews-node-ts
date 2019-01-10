const {GraphQLServer} = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const path = require('path');

const resolvers = {
  Query: {
    info: () => `This is the API of a hackernews clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
  },
  Mutation: {
    createLink: (parent, args, context) => {
      return context.prisma.createLink({
        description: args.description,
        url: args.url,
      });
    },
    updateLink: (parent, args, context) => {
      return context.prisma.updateLink({
        url: args.url,
        description: args.description
      }, {url: "www.prisma.io"})
    },
    deleteLink: (parent, args, context) => {
      return context.prisma.deleteLink({id: args.id})
    }
  }
}

const relativePath = path.basename(__dirname);
const server = new GraphQLServer({
    typeDefs: `./${relativePath}/graphql/schema.graphql`,
    resolvers,
    context: {prisma}
});

server.start(() => console.log(`Server is running on http://localhost:4000`));