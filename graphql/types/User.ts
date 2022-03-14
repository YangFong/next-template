import { extendType, objectType } from "nexus"
import { Post } from "./Post"

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id")
    t.string("name")
    t.string("email")
    t.list.field("posts", {
      type: Post,
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user
          .findUnique({
            where: {
              id: Number(_parent.id)
            }
          })
          .posts() as any
      }
    })
  }
})

export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(_, args, ctx) {
        return ctx.prisma.user.findMany() as any
      }
    })
  }
})
