import React from "react";
import TodoList from "../TodoList/TodoList";
import useTodoReducer from "./Todo.reducer";
import TodoInput from "../TodoInput/TodoInput";
import { TodoDispatcherContext, TodoItemListContext } from "./Todo.context";

const Todo = () => {
  const [todoList, dispatch] = useTodoReducer();

  return (
    <>
      <TodoDispatcherContext.Provider value={dispatch}>
        <TodoInput />
      </TodoDispatcherContext.Provider>

      <TodoItemListContext.Provider value={todoList}>
        <TodoDispatcherContext.Provider value={dispatch}>
          <TodoList />
        </TodoDispatcherContext.Provider>
      </TodoItemListContext.Provider>
    </>
  );
};

export default Todo;
