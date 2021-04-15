import React, {useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import TodoColumnContainer from "../TodoColumn/TodoColumnContainer.js";
import API from "../../util/API.js";

const TodoColumnListContainer = ({ onDispatch }) => {
  const [draggableCard, setDraggableCard] = useState(null);
  const $draggableCard = useRef();
  const dragEnterableColumn = useRef();
  
  const handleDispatch = () => {
    // TODO 네트워크 및 드래그앤 드랍
    // TEST
    // onDispatch({title: "todo.title", date:"todo.createDate", author:"todo.author", action:'DELETE', from:'complete'})
    
    // 
  }

  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {  
      const getColumns = await API.get.columns();
      console.log(getColumns)
      setColumns([...getColumns])  
    }
    fetchData();
    console.log("dragEnterableColumn", dragEnterableColumn.current)
    console.log("$draggableCard", $draggableCard.current)
  }, []);
  
  const handleDropPurely = () => {
    if (dragEnterableColumn.current) {
      dragEnterableColumn.current.addTodo(draggableCard);
    }
  }

  const handleDragStartPurely = (ev) => {

  }

  const handleDragStart = (e)  => {
    // 데이터 전달 객체에 대상 요소의 id를 추가합니다.
    // ev.dataTransfer.setData("card/drag", ev.target.id);
    // ev.dataTransfer.dropEffect = "move";
    console.log("mouseDown", e.currentTarget, e.target)
    e.target.style.width = `${e.target.offsetWidth}px`;
    e.target.style.height = `${e.target.offsetHeight}px`;
    e.target.style.position = 'absolute';
    e.target.style.zIndex = '99';
    e.currentTarget.addEventListener('mousedown', handleDragStart);

    console.log(e.target)
    document.body.append(e.target)

    const moveAt = ( pageX, pageY) => {
      e.target.style.left = pageX - e.target.offsetWidth / 2 + 'px';
      e.target.style.top = pageY - e.target.offsetHeight / 2 + 'px';
    }
    moveAt(e.pageX, e.pageY);

    const onMouseMove = (e) => {
      moveAt(e.pageX, e.pageY);
    }
    e.currentTarget.addEventListener('mousemove', onMouseMove);
    e.currentTarget.onmouseup = () => {
      console.log("mouseUp")
      e.currentTarget.removeEventListener('mousemove', onMouseMove);
      e.target.onmouseup = null;
    };
    
  }
  // legacy
  
  // const handleDragStart = (ev)  => {
  //   // 데이터 전달 객체에 대상 요소의 id를 추가합니다.
  //   ev.dataTransfer.setData("card/drag", ev.target.id);
  //   ev.dataTransfer.dropEffect = "move";
  //   console.log("dragstart_handler", ev.target.id, ev.dataTransfer.dropEffect)
  // }

  const handleDrop = (ev) => {
    console.log("drop_handler", ev)
    ev.preventDefault();
    const data = ev.dataTransfer.getData("application/my-app");
    // ev.target.appendChild(document.getElementById(data));
  }

  const handleDragLeave = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    
    if (ev.target.className.includes("droppable")) ev.target.style.border = "";
  }
  const handleDragEnter = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.target.className.includes("droppable")) ev.target.style.border = "1px solid red";
  }

  const handleDragOver = (ev) => {
    ev.stopPropagation();
    ev.preventDefault(); // dragOver만 작동. throttle, debounce 불가
    
    // throttle(() => { dragover_handler(ev)}, 1000)
    // debounced(dragover_handler, 350)
  }

  const dragover_handler = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
    console.log("dragover_handler", ev)
  }

  // const timeoutFunc = useRef();
  // const throttle = (func, millisec) => {
  //   if (!timeoutFunc.current) {
  //     timeoutFunc.current = setTimeout(() => {
  //       console.log("fired", timeoutFunc.current)
  //       console.log(func())
  //       timeoutFunc.current = false;
  //     }, millisec);
  //   }
  // }
  // const debounced = (func, millisec) => {
  //   if(timeoutFunc.current) clearTimeout(timeoutFunc.current)
  //   timeoutFunc.current = setTimeout(() => {
  //     console.log("fired", timeoutFunc.current)
  //     func()
  //   }, millisec);
  // }
  
  return (
    <TodoColumnContainerLayout>
      {columns.map((colName, i) => {
        return <TodoColumnContainer state={colName} key={`${colName}-${i}`} ref={dragEnterableColumn} $draggableCardRef={$draggableCard}
          onDispatch={onDispatch} 
          handleDragStart={handleDragStart} handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragEnter={handleDragEnter} handleDragLeave={handleDragLeave}
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
