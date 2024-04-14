import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeTodo, updateTodo } from "../../redux/slices/todo";
import AddTodo from "./AddTodo";

interface todoType {
  id: number;
  text: string;
  isDone: boolean;
}

const Todos = () => {
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();

  const markDone = (todo: todoType) => {
    console.log("Mark Done Clicked", todo);
    console.log(todo.isDone);
    dispatch(
      updateTodo({
        id: todo.id,
        text: todo.text,
        isDone: true,
      })
    );
  };

  return (
    <div>
      <div>
        <AddTodo />
      </div>
      {todos.map((todo) => (
        <div className="flex space-x-5" key={todo.id}>
          <li className="flex space-x-3">
            <p>{todo.text}</p>
            <p>{todo.isDone}</p>
            {todo.isDone ? <p>True</p> : <p>False</p>}
          </li>
          <button onClick={() => markDone(todo)}>Y</button>
          <button onClick={() => dispatch(removeTodo({ id: todo.id }))}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
