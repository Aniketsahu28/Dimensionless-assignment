import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSetRecoilState } from 'recoil';
import { popupAtom } from '../store/popupAtom';
import { todosAtom } from '../store/todosAtom';
import { useRef } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AddTodoPopup = () => {
    const setPopup = useSetRecoilState(popupAtom)
    const setTodos = useSetRecoilState(todosAtom)
    const todotitle = useRef()
    const tododate = useRef()
    const todotime = useRef()

    const addtodo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/todo/createtodo`, {
                title: todotitle.current.value,
                date: tododate.current.value,
                time: todotime.current.value
            })
            setTodos((prevTodos) => [
                ...prevTodos,
                {
                    title: todotitle.current.value,
                    date: tododate.current.value,
                    time: todotime.current.value,
                    status: false
                }
            ])
            alert(response.data.message)
        }
        catch (error) {
            alert(error.response?.data.message || error)
        }
        setPopup(null)
    }

    return (
        <form
            onSubmit={addtodo}
            className="rounded-lg mx-auto p-4 w-80 flex flex-col gap-8 font-lato mt-32 text-black bg-white"
        >
            <div className="flex justify-between items-center">
                <p className="text-2xl font-montserrat font-medium">
                    Add todo
                </p>
                <RxCross2
                    className="text-2xl cursor-pointer"
                    onClick={() => setPopup(null)}
                />
            </div>
            <div className="flex flex-col gap-4">
                <span className='flex flex-col gap-1'>
                    <label htmlFor="title" className='lg:text-lg'>Todo <span className='text-red-600'>*</span></label>
                    <input type="text" name="title" id="title" placeholder='Ex: Go to the Gym' className='border-2 border-black/40 rounded-lg  px-1 py-2 outline-none lg:text-lg' ref={todotitle} required />
                </span>
                <div className='flex flex-col sm:grid grid-cols-4 gap-4'>
                    <span className='flex flex-col gap-1 col-span-2'>
                        <label htmlFor="date" className='lg:text-lg'>Date</label>
                        <input type="date" name="date" id="date" className='border-2 border-black/40 rounded-lg  px-1 py-2 outline-none' ref={tododate} />
                    </span>
                    <span className='flex flex-col gap-1 col-span-2'>
                        <label htmlFor="time" className='lg:text-lg'>Time</label>
                        <input type="time" name="time" id="time" className='border-2 border-black/40 rounded-lg  px-1 py-2 outline-none' ref={todotime} />
                    </span>
                </div>
            </div>
            <button
                type="submit"
                className="px-4 py-2 text-white rounded-md text-lg bg-green-600"
            >
                Add todo
            </button>
        </form>
    )
}

export default AddTodoPopup
