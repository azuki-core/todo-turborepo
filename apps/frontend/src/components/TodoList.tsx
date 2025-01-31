'use client'

import { titleAtom } from '../atoms/titleState'
import { FetchTodoDocument, UpdateTodoDocument, DeleteTodoDocument } from '@todo-turborepo/client-api'
import { useQuery, useMutation } from '@apollo/client'
import { useRecoilValue } from 'recoil'
import { List, Button, Form, Input, Spin, message, Checkbox } from 'antd'
import { t } from 'i18next'
const TodoList: React.FC = () => {
  const { data, loading, error } = useQuery(FetchTodoDocument)
  const [updateTodo] = useMutation(UpdateTodoDocument)
  const [deleteTodo] = useMutation(DeleteTodoDocument)
  const title = useRecoilValue(titleAtom)

  if (loading) return <p className="text-center text-gray-500">Loading...</p>
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>

  const handleToggleDone = async (id: number, currentDone: boolean) => {
    try {
      await updateTodo({
        variables: {
          id,
          done: !currentDone,
        },
        refetchQueries: [{ query: FetchTodoDocument }],
      })
    } catch (err) {
      console.error('Error updating todo:', err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo({
        variables: { id },
        refetchQueries: [{ query: FetchTodoDocument }],
      })
    } catch (err) {
      console.error('Error deleting todo:', err)
    }
  }

  return (
    <div className="">
      <List
        itemLayout="horizontal"
        dataSource={data?.todos}
        renderItem={(todo, index) => (
          <List.Item>
            <Checkbox checked={todo.done} onChange={() => handleToggleDone(todo.id, todo.done)} />
            <div className="ml-1">{todo.title}</div>
            <Button className="ml-1" type="default" htmlType="submit" onClick={() => handleDelete(todo.id)}>
              {t(`delete`)}
            </Button>
          </List.Item>
        )}
      />
      <div className="mt-5">
        {t(`recoil-value`)}: {title}
      </div>
    </div>
  )
}

export default TodoList
