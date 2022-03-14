import { objectType, extendType } from "nexus"
import { User } from "./User"

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.string("id")
    t.string("createdAt")
    t.string("updatedAt")
    t.string("title")
    t.string("content")
    t.string("published")
    t.string("viewCount")
    t.string("authorId")
    t.nonNull.field("author", {
      type: User,
      resolve(_parent, _args, ctx) {
        return ctx.prisma.post
          .findUnique({
            where: {
              id: Number(_parent.id)
            }
          })
          .author() as any
      }
    })
  }
})

export const PostsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("posts", {
      type: "Post",
      resolve(_, args, ctx) {
        return ctx.prisma.post.findMany() as any
      }
    })
  }
})
