import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TodoColumnContainer from "../TodoColumn/TodoColumnContainer.js";

const TodoColumnListContainer = ({ onDispatch }) => {
  const [draggableCard, setDraggableCard] = useState(null);
  const handleDispatch = () => {
    // TODO 네트워크 및 드래그앤 드랍
    // TEST
    // onDispatch({title: "todo.title", date:"todo.createDate", author:"todo.author", action:'DELETE', from:'complete'})
  };

  const [columns, setColumns] = useState([
    { title: "schedule" },
    { title: "progress" },
    { title: "complete" },
  ]);

  useEffect(() => {
    // 서버로부터 컬럼 정보를 받는다. => setColumns 변환
    handleDispatch();
  }, []);

  return (
    <TodoColumnContainerLayout>
      {columns.map((colName, i) => {
        return (
          <TodoColumnContainer
            state={colName}
            key={`${colName}-${i}`}
            onDispatch={onDispatch}
          />
        );
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
