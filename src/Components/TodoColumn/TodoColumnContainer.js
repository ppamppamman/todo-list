import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import Global from '../../global.js'
import TodoColumnPresentational from './TodoColumnPresentational.js'

const MOCK_DATA = [
  {
    id: 'Neis-1617897760488',
    author: 'Neis',
    title: 'TODO1',
    content: 'Content1',
    createTime: 1617897760488,
    updateTime: null,
  },
  {
    id: 'Neis-1617897760508',
    author: 'Neis',
    title: 'TODO2',
    content: 'Content2, lo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ng content',
    createTime: 1617897760508,
    updateTime: 1617897806951,
  },
  {
    id: 'Neis-1617897765008',
    author: 'Neis',
    title: 'TODO2',
    content: 'Content3',
    createTime: 1617897765008,
    updateTime: 1617898140149,
  },
];

function TodoColumnContainer(props, ref) {
  const [state, setState] = useState(props.state);
  const [todosData, setTodosData] = useState([]);
  const $dragEnterableColumn = useRef();

  useEffect(() => {
    // TODO: network logic, FIXME
    // fetch(url, props.columnId...)
    const data = MOCK_DATA;
    setTodosData(data);
  }, []);


  useImperativeHandle(
    ref, () => ({
      addTodo: (movedTodoData) => setTodosData([...todosData.map, movedTodoData]), // 향후 addTodo로 변경
      deleteTodo: (todoId) => deleteTodo(todoId),
      getColumn:() => $dragEnterableColumn.current
    }),
  )
  // draggableCardRef

  const addTodo = () => {
    // TODO: UPDATE API
    // TODO: Loading
  }

  const deleteTodo = (todoId) => {
    // TODO: DELETE API, Loading
    setTodosData(todosData.filter(data => data.id !== todoId));
  }

  const handleClickAddBtn = () => {
    setTodosData([Global.getInitialTodoData(), ...todosData]);
  };

  return (
    <TodoColumnPresentational
      handleDragStart={props.handleDragStart} handleDragOver={props.handleDragOver} handleDragEnter={props.handleDragEnter} handleDragLeave={props.handleDragLeave} handleDrop={props.handleDrop} // 드래그 함수
      $draggableCardRef={props.$draggableCardRef} $dragEnterableColumnRef={$dragEnterableColumn} // 드래그 ref
      handleClickAddBtn={handleClickAddBtn}
      dispatch={props.onDispatch}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      title={state.title}
      todosData={todosData}
    />
  );
}

export default forwardRef(TodoColumnContainer);
