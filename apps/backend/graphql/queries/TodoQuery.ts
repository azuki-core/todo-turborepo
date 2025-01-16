import { list, nonNull, type ObjectDefinitionBlock } from 'nexus/dist/core'
import { prisma } from '@todo-turborepo/backend-infra'

export const TodosQuery = (t: ObjectDefinitionBlock<'Query'>) => {
  t.nonNull.field('todos', {
    type: list(nonNull('Todo')),
    resolve: async (_, __, ctx) => {
      const todos = await prisma.todo.findMany({
        orderBy: {
          createdAt: 'asc',
        },
      })

      return todos
    },
  })
}
