import { objectType } from 'nexus'
import { TodosQuery } from './queries/TodoQuery'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    TodosQuery(t)
  },
})
