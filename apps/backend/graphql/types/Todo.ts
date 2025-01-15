import { objectType } from 'nexus'

export const Todo = objectType({
  name: 'Todo',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.nonNull.boolean('done')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
