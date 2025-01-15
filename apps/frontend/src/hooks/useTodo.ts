// import { atom, selector, useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
// import { useQuery, useMutation } from '@apollo/client'
// import { FetchTodoDocument, UpdateTodoDocument, DeleteTodoDocument, type TodoFieldsFragment } from '../generated/apollo'

// const todosAtom = atom<TodoFieldsFragment[]>({
//   key: 'todosAtom',
//   default: [],
// })

// const todosSelector = selector({
//   key: 'todosSelector',
//   get: async ({ get }) => {
//     const { data, error } = await useQuery(FetchTodoDocument)
//     if (error) throw error
//     return data?.todos
//   },
// })

// export const useTodoQuerySelector = () => useRecoilValue(todosSelector)

// const loadingAtom = atom({
//   key: 'loadingAtom',
//   default: true,
// })

// const errorAtom = atom({
//   key: 'errorAtom',
//   default: null,
// })

// export function useTodos() {
//   const [todos, setTodos] = useRecoilState(todosAtom)
//   const setLoading = useSetRecoilState(loadingAtom)
//   const setError = useSetRecoilState(errorAtom)

//   const [updateTodoMutation] = useMutation(UpdateTodoDocument)
//   const [deleteTodoMutation] = useMutation(DeleteTodoDocument)

//   const fetchTodos = async () => {
//     setLoading(true)
//     try {
//       const result = await useQuery(FetchTodoDocument)
//       if (result.data) {
//         setTodos(result.data.todos)
//       }
//     } catch (error: any) {
//       setError(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const updateTodo = async (id: number, done: boolean) => {
//     try {
//       await updateTodoMutation({ variables: { id, done } })
//       setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done } : todo)))
//     } catch (error: any) {
//       setError(error)
//     }
//   }

//   const deleteTodo = async (id: number) => {
//     try {
//       await deleteTodoMutation({ variables: { id } })
//       setTodos(todos.filter((todo) => todo.id !== id))
//     } catch (error: any) {
//       setError(error)
//     }
//   }

//   return { todos, fetchTodos, updateTodo, deleteTodo }
// }

// // Custom hook for loading state
// export function useLoading() {
//   return useRecoilValue(loadingAtom)
// }

// // Custom hook for error state
// export function useError() {
//   return useRecoilValue(errorAtom)
// }
