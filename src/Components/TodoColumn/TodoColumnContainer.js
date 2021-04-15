import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import Global from '../../global.js'
import TodoColumnPresentational from './TodoColumnPresentational.js'

function TodoColumnContainer(props, ref) {

  const [state, setState] = useState(props.state);
  const [todosData, setTodosData] = useState([]);
  const $dragEnterableColumn = useRef();

  useEffect(async () => {
    const fetchData = await API.get.todos({ columnId: state.id });
    console.log(fetchData);
    setTodosData([...fetchData]);
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
    // TODO: Loading
    setTodosData(todosData.filter(data => data.id !== todoId));
  }

  const handleClickAddBtn = () => {
    setTodosData([Global.getInitialTodoData(), ...todosData]);
  };

  const handleClickDeleteBtn = () => {
    // TODO
  }

  return (
    <TodoColumnPresentational
      handleDragStart={props.handleDragStart} handleDragOver={props.handleDragOver} handleDragEnter={props.handleDragEnter} handleDragLeave={props.handleDragLeave} handleDrop={props.handleDrop} // 드래그 함수
      $draggableCardRef={props.$draggableCardRef} $dragEnterableColumnRef={$dragEnterableColumn} // 드래그 ref
      handleClickAddBtn={handleClickAddBtn}
      dispatch={props.onDispatch}
      deleteTodo={deleteTodo}
      title={state.title}
      todosData={todosData}
    />
  );
}

export default forwardRef(TodoColumnContainer);
