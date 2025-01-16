import { booleanArg, idArg, intArg, nonNull, nullable } from 'nexus'
import type { ObjectDefinitionBlock } from 'nexus/dist/core'
import { prisma } from '@todo-turborepo/backend-infra'

export const updateTodoMutation = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.nullable.field('updateTodo', {
    type: nullable('Todo'),
    args: {
      id: nonNull(intArg()),
      done: nonNull(booleanArg()),
    },
    resolve: async (_, arguments_, ctx) => {
      const todo = await prisma.todo.update({
        where: {
          id: Number(arguments_.id),
        },
        data: {
          done: arguments_.done,
        },
      })

      return todo
    },
  })
}
