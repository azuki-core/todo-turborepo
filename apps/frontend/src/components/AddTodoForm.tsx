'use client'
import { useMutation } from '@apollo/client'
import { CreateTodoDocument, FetchTodoDocument } from '@todo-turborepo/client-api'
import { useRecoilState } from 'recoil'
import { titleAtom } from '../atoms/titleState'
import { Button, Form, Input } from 'antd'
import { t } from 'i18next'
const AddTodoForm = () => {
  const [title, setTitle] = useRecoilState(titleAtom)
  const [createTodo] = useMutation(CreateTodoDocument, {
    refetchQueries: [{ query: FetchTodoDocument }],
  })
  const handleSubmit = async (e: React.FormEvent) => {
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
            {t(`add-todo`)}
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default AddTodoForm
