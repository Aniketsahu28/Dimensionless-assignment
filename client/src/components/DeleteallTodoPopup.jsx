import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSetRecoilState } from 'recoil';
import { popupAtom } from '../store/popupAtom';
import axios from 'axios';
import { todosAtom } from '../store/todosAtom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DeleteallTodoPopup = () => {
    const setPopup = useSetRecoilState(popupAtom)
    const setTodos = useSetRecoilState(todosAtom)
    const deletealltodos = async () => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/todo/deleteall`)
            setTodos([])
            alert(response.data.message)
        }
        catch (error) {
            alert(error.response?.data.message || error)
        }
        setPopup(null)
    }

    return (
        <div
            className="rounded-lg mx-auto p-4 w-80 flex flex-col gap-8 font-lato mt-32 text-black bg-white"
        >
            <span className="flex justify-between items-center">
                <p className="text-2xl font-montserrat font-medium">
                    Delete all todo
                </p>
                <RxCross2
                    className="text-2xl cursor-pointer"
                    onClick={() => setPopup(null)}
                />
            </span>
            <p className='text-center text-lg'>Are you sure you want to delete all todos, you can never retrieve them again.</p>
            <button
                className="px-4 py-2 text-white rounded-md text-lg bg-red-600"
                onClick={deletealltodos}
            >
                Yes, delete all todo
            </button>
        </div>
    )
}

export default DeleteallTodoPopup
