import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import Todo from "./components/Todo";
import { useRecoilState, useSetRecoilState } from 'recoil'
import { todosAtom } from './store/todosAtom'
import { popupAtom } from './store/popupAtom'
import PopupScreen from "./components/PopupScreen";
import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [todos, setTodos] = useRecoilState(todosAtom)
  const [doneTodos, setDoneTodos] = useState([])
  const [undoneTodos, setUndoneTodos] = useState([])
  const setPopup = useSetRecoilState(popupAtom)

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (todos?.length > 0) {
      const done = [];
      const undone = [];

      todos.forEach((todo) => {
        todo.status ? done.push(todo) : undone.push(todo)
      })

      setDoneTodos(done)
      setUndoneTodos(undone)
    }
  }, [todos])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/todo`);
      setTodos(response.data.todos);
    } catch (error) {
      console.log(error.response.data.message || error);
    }
  };

  return (
    <>
      <PopupScreen />
      <div>
        <Navbar />
        <div className="px-4 py-6 sm:px-8 sm:py-8 flex flex-col gap-4">
          <span className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <h1 className="text-2xl sm:text-3xl font-semibold text-black/70">
              Your To-Do
            </h1>
            <span className="flex gap-2 sm:gap-4">
              <button className="flex gap-2 sm:gap-3 items-center justify-center px-3 py-2 text-white rounded-md text-lg bg-green-600"
                onClick={() => setPopup('addtodo')}>
                <FaPlus />
                <span>Add Todo</span>
              </button>
              <button className="flex gap-2 sm:gap-3 items-center justify-center px-3 py-2 text-white rounded-md text-lg bg-red-600"
                onClick={() => setPopup('deletealltodo')}>
                <RiDeleteBin6Line />
                <span>Delete all todo</span>
              </button>
            </span>
          </span>
          <hr className="border-2" />
          {todos?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {[...undoneTodos].reverse().map((todo) => (
                <Todo key={todo._id} todo={todo} />
              ))}
              {[...doneTodos].reverse().map((todo) => (
                <Todo key={todo._id} todo={todo} />
              ))}
            </div>
          ) : (
            "No todo"
          )}
        </div>
      </div>
    </>
  );
}

export default App;
