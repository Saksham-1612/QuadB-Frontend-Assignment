import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeTodo, updateTodo } from "../../redux/slices/todo";
import AddTodo from "./AddTodo";
import { RxCross1 } from "react-icons/rx";

interface todoType {
  id: number;
  text: string;
  isDone: boolean;
}

const Todos = () => {
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const markDone = (todo: todoType) => {
    dispatch(
      updateTodo({
        id: todo.id,
        isDone: !todo.isDone,
      })
    );
  };

  const handleEdit = (todo: todoType) => {
    setEditingTodoId(todo.id);
    setEditedText(todo.text);
  };

  const handleSaveEdit = (todo: todoType) => {
    dispatch(
      updateTodo({
        id: todo.id,
        text: editedText,
      })
    );
    setEditingTodoId(null);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    todo: todoType
  ) => {
    if (event.key === "Enter") {
      handleSaveEdit(todo);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-screen">
      <h2 className="my-2 text-3xl text-orange-500 font-semibold">TASK TOP</h2>
      <AddTodo />
      <div>
        {todos.map((todo: todoType) => (
          <div
            className="flex space-x-5 text-xl my-4  text-black rounded-md bg-blue-200"
            key={todo.id}
          >
            <li className="flex space-x-3 min-w-[50vw]">
              <div className="px-4 py-2 min-[20vw]:">
                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, todo)}
                    className="bg-blue-200 rounded border text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                ) : (
                  <p>{todo.text}</p>
                )}
              </div>
              <div className="px-4 py-2 flex items-center">
                {todo.isDone ? <p>Done</p> : <p>Not Done</p>}
              </div>
            </li>
            <button onClick={() => markDone(todo)}>
              {todo.isDone ? (
                <IoMdCheckmark className="text-green-500" />
              ) : (
                <RxCross1 className="text-red-500" />
              )}
            </button>
            <button onClick={() => handleEdit(todo)}>
              <FaPencil />
            </button>
            <button
              className="mr-2"
              onClick={() => dispatch(removeTodo({ id: todo.id }))}
            >
              <MdDelete className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
