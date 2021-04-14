import React, {useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import TodoColumnContainer from "../TodoColumn/TodoColumnContainer.js";

const TodoColumnListContainer = ({ onDispatch }) => {
  const [draggableCard, setDraggableCard] = useState(null);
  const handleDispatch = () => {
    // TODO 네트워크 및 드래그앤 드랍
    // TEST
    // onDispatch({title: "todo.title", date:"todo.createDate", author:"todo.author", action:'DELETE', from:'complete'})
  }

  const [columns, setColumns] = useState([ {title: 'schedule'}, {title: 'progress'}, {title: 'complete'} ]);
  

  useEffect(() => {
    // 서버로부터 컬럼 정보를 받는다. => setColumns 변환
    handleDispatch();
  }, []);
  
  
  const handleDragStart = (ev)  => {
    // 데이터 전달 객체에 대상 요소의 id를 추가합니다.
    ev.dataTransfer.setData("card/drag", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
    console.log("dragstart_handler", ev.target.id, ev.dataTransfer.dropEffect)
  }

  const handleDrop = (ev) => {
    console.log("drop_handler", ev)
    ev.preventDefault();
    // 대상의 id를 가져와 이동한 대상 DOM 요소를 추가합니다.
    // Get the id of the target and add the moved element to the target's DOM
    
    const data = ev.dataTransfer.getData("application/my-app");
    ev.target.appendChild(document.getElementById(data));
  }

  const handleDragOver = (e) => {
    debounced(() => dragover_handler(e), 350)
  }

  const timeoutFunc = useRef();
  const debounced = (func, millisec) => {
    if(timeoutFunc.current) clearTimeout(timeoutFunc.current)
    timeoutFunc.current = setTimeout(() => {
      console.log("fired", timeoutFunc.current)
      console.log(func())
    }, millisec);
  }
  const dragover_handler = (ev) => {
    console.log("dragover_handler", ev)
    ev.preventDefault();
    
    ev.dataTransfer.dropEffect = "move"
    return false;
  }
  
  return (
    <TodoColumnContainerLayout>
      {columns.map((colName, i) => {
        return <TodoColumnContainer state={colName} key={`${colName}-${i}`} 
          onDispatch={onDispatch} 
          handleDragStart={handleDragStart} handleDragOver={handleDragOver} handleDrop={handleDrop}

        />;
      })}
    </TodoColumnContainerLayout>
  );
};

const TodoDragArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;

  // develop
  background-color: ${(props) => {
    return props.env === "DEV" && "yellow";
  }};
`;

const TodoColumnContainerLayout = styled.div`
  display: flex;
`;

export default TodoColumnListContainer;
