function newLinkSubscribe(parent, args, context, info){
  return context.prisma.$subscribe.link({ mutation_in: ['CREATED']}).node()
}

export const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload
}

