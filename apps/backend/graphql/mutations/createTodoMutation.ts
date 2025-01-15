import { arg, idArg, nonNull, nullable, stringArg } from 'nexus'
import type { ObjectDefinitionBlock } from 'nexus/dist/core'
import {prisma} from '../../lib/prisma'

export const createTodoMutation = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.nullable.field('createTodo', {
    type: nullable('Todo'),
    args: {
      title: nonNull(stringArg()),
    },
    resolve: async (_, arguments_, ctx) => {
      const todo = await prisma.todo.create({
        data: {
          title: arguments_.title,
          done: false,
        },
      })

      return todo
    },
  })
}
