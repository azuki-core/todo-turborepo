import { objectType } from 'nexus'
import { createTodoMutation } from './mutations/createTodoMutation'
import { deleteTodoMutation } from './mutations/deleteTodoMutation'
import { updateTodoMutation } from './mutations/updateTodoMutation'

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    createTodoMutation(t), deleteTodoMutation(t), updateTodoMutation(t)
  },
})
