import { FetchTodoDocument, UpdateTodoDocument, DeleteTodoDocument } from '../generated/apollo'
import { useQuery, useMutation } from '@apollo/client'

const TodoList: React.FC = () => {
  const { data, loading, error } = useQuery(FetchTodoDocument)
  const [updateTodo] = useMutation(UpdateTodoDocument)
  const [deleteTodo] = useMutation(DeleteTodoDocument)

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
    <div className="max-w-md mx-auto mt-8">
      <ul className="space-y-2">
        {data?.todos.map((todo) => (
          <li key={todo.id} className="flex items-center bg-white p-3 rounded shadow">
            <input
              type="checkbox"
              checked={todo.done ?? undefined}
              onChange={() => handleToggleDone(todo.id, todo.done)}
              className="mr-3 form-checkbox h-5 w-5 text-blue-600"
            />
            <span className={`flex-grow ${todo.done ? 'line-through text-gray-500' : ''}`}>{todo.title}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="ml-2 px-2 py-1 bg-gray-200 text-black rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
