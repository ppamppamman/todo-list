import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import Global from '../../global.js'
import API from "../../util/API.js";
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
      addTodo: (movedTodoData) => {console.log(todosData); setTodosData([...todosData, movedTodoData])}, // 향후 addTodo로 변경
      deleteTodo: (movedTodoData) => deleteTodo(movedTodoData.todoId),
      getColumn:() => $dragEnterableColumn.current,
      getColumnTodos:() => todosData,
      getColumnXY:() => [$dragEnterableColumn.current.getBoundingClientRect().left+window.pageXOffset, $dragEnterableColumn.current.getBoundingClientRect().top+window.pageYOffset],
    }),
    props.handleSetDragEnterableColumn(ref)
  )
  // draggableCardRef
  const setDragEnterableColumn = () => {
    // 엔터할 수 있도록 ref 변경
  }

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

  return (
    <TodoColumnPresentational
      handleDragStart={props.handleDragStart} handleDragOver={props.handleDragOver} handleDragEnter={props.handleDragEnter} handleDragLeave={props.handleDragLeave} handleDrop={props.handleDrop} // 드래그 함수
      handleMouseUp={props.handleMouseUp} handleMouseOver={(e) => {console.log("handleMouseOver"); props.handleMouseOver(e);} }
      $draggableCardRef={props.$draggableCardRef} $dragEnterableColumnRef={$dragEnterableColumn} // 드래그 ref
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

export default forwardRef(TodoColumnContainer);
