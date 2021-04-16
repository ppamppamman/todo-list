import React, {useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import TodoColumnContainer from "../TodoColumn/TodoColumnContainer.js";
import API from "../../util/API.js";

const IS_DOUBLE_CLICK = 2;

const TodoColumnListContainer = ({ onDispatch }) => {
  
  const $draggableCard = useRef();
  const mouseDownTracker = useRef();
  
  const $dragEnterableColumns = useRef([])
  const dragEnterableColumn = useRef();
  const beforeDragEnterableColumn = useRef();
  const clickCounter = useRef(0);
  
  const handleSetDragEnterableColumn = (column) => {
    // console.log("========", $dragEnterableColumns, column)
    if ($dragEnterableColumns.current.includes(column)) return;
    $dragEnterableColumns.current.push(column)
  }
  
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {  
      const getColumns = await API.get.columns();
      setColumns([...getColumns])  
    }
    fetchData();
  }, [$dragEnterableColumns]);
  
  const handleMouseOver = (e) => {
    // console.log("handleMouseOver", e)
    // console.log(e.clientX, e.clientY)
  }

  const handleMouseOverWithMouseDown = (e) => {
    const reversed = $dragEnterableColumns.current;
    reversed.forEach((column) => {
      if (e.clientX > column.current.getColumnXY()[0]) {
        dragEnterableColumn.current = column.current;
        return false;
      }
    })
  }

  const handleDropPurely = (cardState) => {
    // console.log(dragEnterableColumn.current)
    
    if (dragEnterableColumn.current) {
      dragEnterableColumn.current.addTodo(cardState);
      beforeDragEnterableColumn.current.deleteTodo(cardState);
    }
  }

  const handleMouseDown = (e, cardState) => {
    // 마우스 다운 트래커 = 클릭 시작 발생
    console.log("// 마우스 다운 트래커 = 클릭 시작 발생", e.target)
    const $currentTarget = e.currentTarget;
    // if (e.target !== e.currentTarget) return false;
    
    // if 마우스 업이라면, 마우스 다운 트래커 clear
    clickCounter.current += 1;
    mouseDownTracker.current = setTimeout(() => {
      // 사격 중지
      clickCounter.current = 0;
      clearTimeout(mouseDownTracker.current);
      handleDragStart(e, $currentTarget, cardState);
      e.preventDefault() // 더블클릭 제어권 박탈 
      
      const reversed = $dragEnterableColumns.current;
      reversed.forEach((column) => {
        if (e.clientX > column.current.getColumnXY()[0]) {
          beforeDragEnterableColumn.current = column.current;
          return false;
        }
      })
      
    }, 1000);
  }
  const handleMouseUp = (e) => {
    console.log("mouseUp", clickCounter.current)
    if (!mouseDownTracker.current || e.target !== e.currentTarget) return false;
    clearTimeout(mouseDownTracker.current);
  }

  const handleDragStart = (e, $currentTarget, cardState)  => {
  
    console.log("드래그 스타트", $currentTarget)
    const $clonedCurrentTarget = $currentTarget.cloneNode(true);
    
    $currentTarget.style.opacity = 0.5;
    $clonedCurrentTarget.style.width = `${$currentTarget.offsetWidth}px`;
    $clonedCurrentTarget.style.height = `${$currentTarget.offsetHeight}px`;
    $clonedCurrentTarget.style.position = 'absolute';
    $clonedCurrentTarget.style.zIndex = '2';
    $clonedCurrentTarget.addEventListener('mousedown', handleMouseDown);

    document.body.append($clonedCurrentTarget)

    const moveAt = (pageX, pageY) => {
      $clonedCurrentTarget.style.left = pageX - $clonedCurrentTarget.offsetWidth / 2 + 'px';
      $clonedCurrentTarget.style.top = pageY - $clonedCurrentTarget.offsetHeight / 2 + 'px';
    }
    moveAt(e.pageX, e.pageY);

    const onMouseMove = (e) => {
      moveAt(e.pageX, e.pageY);
      handleMouseOverWithMouseDown(e);
    }
    $clonedCurrentTarget.addEventListener('mousemove', onMouseMove);
    $clonedCurrentTarget.onmouseup = () => {
      // console.log("컬럼컨테이너", $dragEnterableColumns)
      handleDropPurely(cardState)
      $clonedCurrentTarget.removeEventListener('mousemove', onMouseMove);
      $clonedCurrentTarget.onmouseup = null;
      $clonedCurrentTarget.remove();
      $currentTarget.remove();
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
        
        return <TodoColumnContainer state={colName} key={`${colName}-${i}`} ref={React.createRef()} $draggableCardRef={$draggableCard}
          onDispatch={onDispatch} 
          handleMouseUp={handleMouseUp} handleMouseOver={handleMouseOver} handleSetDragEnterableColumn={handleSetDragEnterableColumn}
          handleDragStart={handleMouseDown} handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragEnter={handleDragEnter} handleDragLeave={handleDragLeave}
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
