import { idArg, intArg, nonNull, nullable } from 'nexus'
import type { ObjectDefinitionBlock } from 'nexus/dist/core'
import {prisma} from '../../lib/prisma'

export const deleteTodoMutation = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.nullable.field('deleteTodo', {
    type: nullable('Todo'),
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, arguments_, ctx) => {
      const record = await prisma.todo.findUnique({
        where: {
          id: Number(arguments_.id),
        },
      })
      if (record === null) {
        throw new Error(`レコードが見つかりません。id: ${arguments_.id}`)
      }

      const res = await prisma.todo.delete({
        where: {
          id: Number(arguments_.id),
        },
      })
      return res
    },
  })
}
