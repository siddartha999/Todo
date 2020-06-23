import React, { useContext } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { TodoItemListContext } from "../Todo/Todo.context";
import "./TodoList.css";

const TodoList = () => {
  const todoItemList = useContext(TodoItemListContext);
  return (
    <div className="TodoList-wrapper">
      {todoItemList &&
        todoItemList.map((item) => (
          <TodoItem value={item.value} key={item.id} id={item.id} />
        ))}
    </div>
  );
};

export default TodoList;
