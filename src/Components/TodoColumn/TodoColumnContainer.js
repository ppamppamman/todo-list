import React, { useState, useEffect } from 'react'
import Global from '../../global.js'
import TodoColumnPresentational from './TodoColumnPresentational.js'
// import { TodoCardViewState } from '../TodoCard/const.js'; // FIXME: handle globally?

const MOCK_DATA = [
  {
    id: 'Neis-1617897760488',
    author: 'Neis',
    title: 'TODO1',
    content: 'Content1',
    createDate: 1617897760488,
    updateDate: null,
  },
  {
    id: 'Neis-1617897760508',
    author: 'Neis',
    title: 'TODO2',
    content: 'Content2, lo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ng content',
    createDate: 1617897760508,
    updateDate: 1617897806951,
  },
  {
    id: 'Neis-1617897765008',
    author: 'Neis',
    title: 'TODO2',
    content: 'Content3',
    createDate: 1617897765008,
    updateDate: 1617898140149,
  },
];

function TodoColumnContainer(props) {
  const [state, setState] = useState(props.state);
  const [todosData, setTodosData] = useState([]);

  useEffect(() => {
    // TODO: network logic, FIXME
    // fetch(url, props.columnId...)
    const data = MOCK_DATA;
    setTodosData(data);
  }, []);

  const addTodo = () => {
    // TODO: UPDATE API
    // TODO: Loading
  }

  const deleteTodo = (todoId) => {
    // TODO: Loading
    setTodosData(todosData.filter(data => data.id !== todoId));
  }

  const handleClickAddBtn = () => {
    setTodosData([Global.getInitialTodoData(), ...todosData]);
  };

  return (
    <TodoColumnPresentational
      handleClickAddBtn={handleClickAddBtn}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      title={state.title}
      todosData={todosData}
    />
  );
}

export default TodoColumnContainer;
