import React from "react";
import { SlCalender } from "react-icons/sl";
import { LuClock5 } from "react-icons/lu";
import { useRecoilState, useSetRecoilState } from "recoil";
import { popupAtom } from "../store/popupAtom";
import { todosAtom } from "../store/todosAtom";
import axios from "axios";
import EditTodoPopup from "./EditTodoPopup";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Todo = ({ todo }) => {
    const [popup, setPopup] = useRecoilState(popupAtom);
    const setTodos = useSetRecoilState(todosAtom);

    const deleteTodo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                `${BACKEND_URL}/api/todo/deleteone`,
                {
                    data: { id: todo._id },
                }
            );
            setTodos((prevTodos) => [
                ...prevTodos.filter((item) => item._id !== todo._id),
            ]);
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data.message || error);
        }
    };

    const toggleTodoStatus = async (e) => {
        try {
            await axios.patch(`${BACKEND_URL}/api/todo/`, {
                id: todo._id,
                status: !todo.status,
            });
            setTodos((prevTodos) =>
                prevTodos.map((item) =>
                    item._id === todo._id ? { ...item, status: !item.status } : item
                )
            );
        } catch (error) {
            alert(error.response?.data.message || error);
        }
    };

    const convertDateToWords = (todoDate) => {
        const [year, month, day] = todoDate.split("-");
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
        return `${day} ${months[month - 1]} ${year}`;
    };

    function convertTo12HourFormat(time24) {
        let [hours, minutes] = time24.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        minutes = String(minutes).padStart(2, "0");
        return `${hours}:${minutes} ${period}`;
    }

    return (
        <>
            {popup === `edittodo${todo._id}` && (
                <div className={`${popup ? "fixed" : "hidden"} h-full w-full bg-black/80 z-30 top-0 left-0`}>
                    <EditTodoPopup todo={todo} />
                </div>
            )}
            <div className="custom_shadow lg:w-[50%] p-2 sm:p-4 rounded-lg flex flex-col gap-2">
                <div className="flex justify-between">
                    <span className="flex sm:items-center gap-3">
                        <input
                            type="checkbox"
                            name="todo"
                            id="todo"
                            className="w-4 h-4 mt-2 sm:mt-0"
                            defaultChecked={todo.status}
                            onChange={toggleTodoStatus}
                        />
                        <p
                            className={`text-xl font-medium text-black/70 ${todo.status && "line-through"
                                }`}
                        >
                            {todo.title}
                        </p>
                    </span>
                    <button
                        className={`px-4 py-1 h-fit text-white rounded-md text-lg bg-red-600 ${todo.status ? "block" : "hidden"
                            }`}
                        onClick={deleteTodo}
                    >
                        Delete
                    </button>
                </div>
                {!todo.status && (
                    <div className="flex flex-col gap-2 sm:flex-row justify-between sm:items-center">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center ml-7">
                            {todo.date && (
                                <span className="flex gap-2 items-center bg-gray-100 px-2 py-1 rounded-md text-black/60">
                                    <SlCalender />
                                    <p>{convertDateToWords(todo.date)}</p>
                                </span>
                            )}
                            {todo.time && (
                                <span className="flex gap-2 items-center bg-gray-100 px-2 py-1 rounded-md text-black/60">
                                    <LuClock5 />
                                    <p>{convertTo12HourFormat(todo.time)}</p>
                                </span>
                            )}
                        </div>
                        <span className="flex gap-2 ml-7 sm:ml-0">
                            <button
                                className="px-4 py-1 text-black rounded-md text-lg bg-yellow-400"
                                onClick={() => setPopup(`edittodo${todo._id}`)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-1 text-white rounded-md text-lg bg-red-600"
                                onClick={deleteTodo}
                            >
                                Delete
                            </button>
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Todo;
