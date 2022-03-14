export const resolvers = {
  Query: {
    posts: (_parent: any, _args: any, ctx: any) => {
      return ctx.prisma.post.findMany()
    },
    users: (_parent: any, _args: any, ctx: any) => {
      return ctx.prisma.user.findMany()
    }
  }
}
