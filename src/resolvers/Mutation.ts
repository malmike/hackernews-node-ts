const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import {getUserId} from '../utils';

export async function createLink(parent, args, context){
  const userId = getUserId(context);
  return context.prisma.createLink({
    description: args.description,
    url: args.url,
    postedBy: { connect: { id: userId } }
  });
}

export async function updateLink(parent, args, context){
  getUserId(context);
  return context.prisma.updateLink({
    url: args.url,
    description: args.description
  }, {url: "www.prisma.io"})
}

export async function deleteLink(parent, args, context){
  getUserId(context);
  return context.prisma.deleteLink({id: args.id});
}

export async function signUp(parent, args, context, info){
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({...args, password})
  const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET)
  return {token, user}
}

export async function login(parent, args, context, info){
  const user = await context.prisma.user({email: args.email})
  if(!user){
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if(!valid){
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET )
  return {token, user}
}

export async function vote(parent, args, context, info){
  const userId = getUserId(context);
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId }
  });
  if( linkExists ){
    throw new Error(`Already voted for link: ${args.linkId}`)
  }
  return context.prisma.createVote({
    user: { connect: { id: userId }},
    link: { connect: { id: args.linkId }}
  })
}