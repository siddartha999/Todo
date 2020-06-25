import React, { useContext, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import {
  TodoItemListContext,
  TodoDispatcherContext,
} from "../Todo/Todo.context";
import DeleteIcon from "@material-ui/icons/Delete";
import "./TodoList.css";
import useToggle from "../ReusableHooks/useToggle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const TodoList = () => {
  const todoItemList = useContext(TodoItemListContext);
  const [selectedTodosList, setSelectedTodosList] = useState([]);
  const [isSelectAllTodos, toggleSelectAllTodos] = useToggle(false);
  const todoDispatcher = useContext(TodoDispatcherContext);

  /**
   * Function to insert/remove individual todos from the selectedTodosList.
   * @param {*} id  -> Id of todo to be marked as selected.
   * @param {*} isInsert -> Specifies whether the Todo needs to be inserted/removed from the selectedTodosList
   */
  const updateIndividualSelectedTodos = (id, isInsert) => {
    if (isInsert) {
      setSelectedTodosList([...selectedTodosList, id]);
    } else {
      const newSelectedTodos = selectedTodosList.filter((item) => item !== id);
      setSelectedTodosList(newSelectedTodos);
    }
  };

  /**
   * Function to toggle all the selected todos.
   * @param {*} isInsert -> Specifies whether to mark all the todos are selected or not, based on true/false.
   */
  const toggleSelectAllTodosList = (isInsert) => {
    if (isInsert) {
      setSelectedTodosList(todoItemList.map((item) => item.id));
      todoDispatcher({
        type: "TOGGLE_ALL_TODO_ITEMS_SELECTION",
        isSelect: true,
      });
    } else {
      setSelectedTodosList([]);
      todoDispatcher({
        type: "TOGGLE_ALL_TODO_ITEMS_SELECTION",
        isSelect: false,
      });
    }
  };

  /**
   * Initiates the delete call to the dispatcher, by passing in the required properties such as
   * type:  indication of multiple todos delete operation.
   * value: list containing the Id's of all the Todos marked for deletion.
   *
   * Finally, resets the selectedTodosList to an empty array.
   */
  const handleDeleteSelectedTodos = () => {
    if (!selectedTodosList.length) {
      return;
    }
    todoDispatcher({
      type: "REMOVE_MULTIPLE_TODO_ITEMS",
      value: selectedTodosList,
    });
    setSelectedTodosList([]);
  };

  /**
   * Handles the toggling of selecting / de-selecting all the Todos.
   * Takes care of updating the selectedTodosList appropriately based on the user selection.
   */

  const handleToggleSelectAllTodos = () => {
    if (!isSelectAllTodos) {
      //isSelectAllTodos is still not updated to true yet. Therefore, checking for the opposite scenario.
      toggleSelectAllTodosList(true);
    } else {
      toggleSelectAllTodosList(false);
    }
    toggleSelectAllTodos();
  };

  const todosSelectedJSX = (
    <div className="TodoList-todos-selected-wrapper">
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={isSelectAllTodos}
            onChange={handleToggleSelectAllTodos}
          />
        }
        label="Select All Todos"
      />
      <div className="TodoList-todos-selected-actions-wrapper">
        <DeleteIcon
          onClick={handleDeleteSelectedTodos}
          className="TodoItem-action"
        />
      </div>
      <div className="TodoList-todos-selected-info-text-wrapper">
        <p>{selectedTodosList.length} Todos Selected</p>
      </div>
    </div>
  );

  return (
    <div className="TodoList">
      {todosSelectedJSX}
      <div className="TodoList-wrapper">
        {todoItemList &&
          todoItemList.map((item) => (
            <TodoItem
              value={item.value}
              key={item.id}
              id={item.id}
              isSelected={item.isSelected}
              updateSelectedTodos={updateIndividualSelectedTodos}
              selectTodoItem={isSelectAllTodos}
            />
          ))}
      </div>
    </div>
  );
};

export default TodoList;
