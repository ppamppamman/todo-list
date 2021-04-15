import React, { useState, useEffect, useRef } from 'react';
import Global from '../../global.js';
import API from '../../util/API.js';
import TodoColumnPresentational from './TodoColumnPresentational.js'

function TodoColumnContainer(props) {
  const [state, setState] = useState(props.state);
  const [todosData, setTodosData] = useState([]);

  useEffect(async () => {
    const fetchData = await API.get.todos({ columnId: state.id });
    console.log(fetchData);
    setTodosData([...fetchData]);
  }, []);

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

  // 드래그
  // const timeoutFunc = useRef();
  // const debounced = (func, millisec) => {
  //   if(timeoutFunc.current) clearTimeout(timeoutFunc.current)
  //   timeoutFunc.current = setTimeout(() => {
  //     console.log("fired", timeoutFunc.current)
  //     console.log(func())
  //   }, millisec);
  // }

  // const dragover_handler = (ev) => {
  //   console.log("dragover_handler", ev)
  //   ev.preventDefault();
    
  //   ev.dataTransfer.dropEffect = "move"
  //   return false;
  // }


  return (
    <TodoColumnPresentational
      handleDragStart={props.handleDragStart} handleDragOver={props.handleDragOver} handleDragEnter={props.handleDragEnter} handleDragLeave={props.handleDragLeave} handleDrop={props.handleDrop} // 드래그
      handleClickAddBtn={handleClickAddBtn}
      dispatch={props.onDispatch}
      deleteTodo={deleteTodo}
      title={state.title}
      todosData={todosData}
    />
  );
}

export default TodoColumnContainer;
