import type { NextPage } from 'next'
import Head from 'next/head'
import TodoList from '../components/TodoList'
import AddTodoForm from '../components/AddTodoForm'
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center">
        <AddTodoForm />
        <TodoList />
      </div>
    </div>
  )
}

export default Home
