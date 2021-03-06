function newLinkSubscribe(parent, args, context, info){
  return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
}

function newVoteSubscribe(parent, args, context, info){
  return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node();
}

export const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload
}

export const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => payload
}
