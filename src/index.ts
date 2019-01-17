import { request } from "http";
const path = require('path');
const {GraphQLServer} = require('graphql-yoga');

import * as Mutation from './resolvers/Mutation';
import * as Query from './resolvers/Query';
import * as User from './resolvers/User';
import * as Link from './resolvers/Link';
import * as Subscription from './resolvers/Subscription';
import * as Vote from './resolvers/Vote';
import { prisma } from './generated/prisma-client';


if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load();
}

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
}

const relativePath = path.basename(__dirname);
const server = new GraphQLServer({
    typeDefs: `./${relativePath}/graphql/schema.graphql`,
    resolvers,
    context: request => {
      return {
        ...request,
        prisma
      }
    }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));