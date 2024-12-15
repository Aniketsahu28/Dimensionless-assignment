import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSetRecoilState } from "recoil";
import { popupAtom } from "../store/popupAtom";
import { todosAtom } from "../store/todosAtom";
import axios from "axios";

const EditTodoPopup = ({ todo }) => {
    const setPopup = useSetRecoilState(popupAtom);
    const setTodos = useSetRecoilState(todosAtom);
    const [todoDetails, setTodoDetails] = useState({
        title: todo.title,
        date: todo.date,
        time: todo.time,
    });

    const edittodo = async (e) => {
        e.preventDefault();
        try {
            await axios.patch("http://192.168.0.110:3000/api/todo/", {
                id: todo._id,
                title: todoDetails.title,
                date: todoDetails.date,
                time: todoDetails.time,
            });
            setTodos((prevTodos) =>
                prevTodos.map((item) =>
                    item._id === todo._id
                        ? {
                            ...item,
                            title: todoDetails.title,
                            date: todoDetails.date,
                            time: todoDetails.time,
                        }
                        : item
                )
            );
        } catch (error) {
            alert(error.response?.data.message || error);
        }
        setPopup(null);
    };

    const handleChangeDate = (e) => {
        setTodoDetails((prevDetails) => {
            return {
                ...prevDetails,
                date: e.target.value,
            };
        });
    };

    const handleChangeTime = (e) => {
        setTodoDetails((prevDetails) => {
            return {
                ...prevDetails,
                time: e.target.value,
            };
        });
    };

    const handleChangeTitle = (e) => {
        setTodoDetails((prevDetails) => {
            return {
                ...prevDetails,
                title: e.target.value,
            };
        });
    };

    return (
        <form
            onSubmit={edittodo}
            className="rounded-lg mx-auto p-4 w-80 flex flex-col gap-8 font-lato mt-32 text-black bg-white"
        >
            <div className="flex justify-between items-center">
                <p className="text-2xl font-montserrat font-medium">Edit todo</p>
                <RxCross2
                    className="text-2xl cursor-pointer"
                    onClick={() => setPopup(null)}
                />
            </div>
            <div className="flex flex-col gap-4">
                <span className="flex flex-col gap-1">
                    <label htmlFor="title" className="lg:text-lg">
                        Todo <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Ex: Go to the Gym"
                        className="border-2 border-black/40 rounded-lg  px-1 py-2 outline-none lg:text-lg"
                        value={todoDetails.title}
                        required
                        onChange={handleChangeTitle}
                    />
                </span>
                <div className="flex flex-col sm:grid grid-cols-4 gap-4">
                    <span className="flex flex-col gap-1 col-span-2">
                        <label htmlFor="date" className="lg:text-lg">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            className="border-2 border-black/40 rounded-lg  px-1 py-2 outline-none"
                            value={todoDetails.date}
                            onChange={handleChangeDate}
                        />
                    </span>
                    <span className="flex flex-col gap-1 col-span-2">
                        <label htmlFor="time" className="lg:text-lg">
                            Time
                        </label>
                        <input
                            type="time"
                            name="time"
                            id="time"
                            className="border-2 border-black/40 rounded-lg  px-1 py-2 outline-none"
                            value={todoDetails.time}
                            onChange={handleChangeTime}
                        />
                    </span>
                </div>
            </div>
            <button
                type="submit"
                className="px-4 py-2 text-white rounded-md text-lg bg-green-600"
            >
                Save Changes
            </button>
        </form>
    );
};

export default EditTodoPopup;
