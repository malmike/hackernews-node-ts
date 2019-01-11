import {getUserId} from '../utils';

export function feed(root, args, context, info){
  getUserId(context);
  return context.prisma.links()
}