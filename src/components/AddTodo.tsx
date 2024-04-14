import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { createTodo } from "../../redux/slices/todo";

const AddTodo = () => {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const dispatch = useAppDispatch();

  const addTodoHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(done, text);

    dispatch(createTodo({ text, done })); // Pass text and done as an object
    setText(""); // Clear the input after adding a todo
    setDone(false);
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 my-4">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
