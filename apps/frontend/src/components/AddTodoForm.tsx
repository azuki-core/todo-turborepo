import { useMutation } from '@apollo/client'
import { CreateTodoDocument, FetchTodoDocument } from '../generated/apollo'
import { useRecoilState } from 'recoil'
import { titleAtom } from '../atoms/titleState'
import { Button, Form, Input } from 'antd'

const AddTodoForm = () => {
  const [title, setTitle] = useRecoilState(titleAtom)
  const [createTodo] = useMutation(CreateTodoDocument, {
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
    <Form onFinish={handleSubmit}>
      <div className="flex flex-cols mt-3">
        <Form.Item name="text">
          <Input placeholder="Enter todo title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>{' '}
        <Form.Item className="ml-1">
          <Button type="primary" htmlType="submit">
            Add Todo
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default AddTodoForm
