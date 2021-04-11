import React, { useState, useEffect } from 'react'
import TodoColumnPresentational from './TodoColumnPresentational.js'
import TodoCardContainer from '../TodoCard/TodoCardContainer.js';
import { TodoCardViewState } from '../TodoCard/const.js'; // FIXME: handle globally?

const MOCK_DATA = [
  {
    todoId: 'Neis-1617897760488',
    author: 'Neis',
    title: 'TODO1',
    content: 'Content1',
    createDate: 1617897760488,
    updateDate: null,
  },
  {
    todoId: 'Neis-1617897760508',
    author: 'Neis',
    title: 'TODO2',
    content: 'Content2',
    createDate: 1617897760508,
    updateDate: 1617897806951,
  },
  {
    todoId: 'Neis-1617897765008',
    author: 'Neis',
    title: 'TODO2',
    content: 'Content3',
    createDate: 1617897765008,
    updateDate: 1617898140149,
  },
];

function TodoColumnContainer(props) {
  const [title, setTitle] = useState(props.state);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // TODO: network logic, FIXME
    // fetch(url, props.columnId...)
    const todoData = MOCK_DATA;
    return _init(todoData);
  }, []);

  const _init = (todoData) => {
    setTodos(todoData.map(data =>
      <TodoCardContainer
        key={data.todoId}
        viewState={TodoCardViewState.NORMAL}
        state={data}
      />
    ));
  };

  const _createEditTodo = () => {
    return (
      <TodoCardContainer
        key={`new-${new Date().valueOf()}`} // TODO: replace to ID generator
        viewState={TodoCardViewState.EDIT}
      />
    );
  }

  const addTodo = () => {
    // TODO: UPDATE API
  }

  const deleteTodo = () => {
    // TODO: DELETE API
  }

  const handleClickAddBtn = ({ target }) => {
    setTodos([_createEditTodo(), ...todos]);
  };

  return (
    <TodoColumnPresentational
      handleClickAddBtn={handleClickAddBtn}
      title={title}
      todoCnt={todos.length}
      todos={todos}
    />
  );
}

export default TodoColumnContainer;
