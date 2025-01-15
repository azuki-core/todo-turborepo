import { useMutation } from '@apollo/client'
import { CreateTodoDocument, FetchTodoDocument } from '../generated/apollo'
import { useRecoilState } from 'recoil'
import { titleAtom } from '../atoms/titleState'

const AddTodoForm = () => {
  const [title, setTitle] = useRecoilState(titleAtom)
  const [createTodo, { data, loading, error }] = useMutation(CreateTodoDocument, {
    refetchQueries: [{ query: FetchTodoDocument }],
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTodo({ variables: { title } })
      setTitle('') // Clear the input field
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-4 py-2"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  )
}

export default AddTodoForm
