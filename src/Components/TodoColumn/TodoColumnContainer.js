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

  const addTodo = async ({ todoData }) => {
    const res = await API.post.todo({ todoData });
    if (!res.success)
      throw new Error('todo post fail');

    const todoDataIdx = todosData.findIndex(data => data.id === todoData.id);
    todosData.splice(todoDataIdx, 1, { ...todoData, id: res.id });
    setTodosData([...todosData]);
  }

  const updateTodo = async ({ todoData }) => {
    const res = await API.patch.todo({ todoData });
    if (res.success)
      throw new Error('todo patch fail');

    // FIXME
  }

  const deleteTodo = async (todoId) => {
    // TODO: Loading
    const res = await API.delete.todo({ todoId });
    if (!res.success)
      throw new Error('todo delete fail');

    setTodosData(todosData.filter(data => data.id !== todoId));
  }

  const handleClickAddBtn = () => {
    setTodosData([Global.getInitialTodoData({ columnId: state.id }), ...todosData]);
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
      addTodo={addTodo}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
      title={state.title}
      todosData={todosData}
    />
  );
}

export default TodoColumnContainer;
