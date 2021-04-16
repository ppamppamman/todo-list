import React from 'react'
import styled from 'styled-components';
import { TodoCardViewState } from '../TodoCard/const.js';
import TodoCardContainer from '../TodoCard/TodoCardContainer.js';

function TodoColumnPresentational(props) {
  const renderTodos = (todosData) => {
    return todosData.map(data => 
      <TodoCardContainer
        key={data.id}
        dispatch={props.dispatch}
        addTodo={props.addTodo}
        updateTodo={props.updateTodo}
        deleteTodo={props.deleteTodo}
        viewState={data.createTime ? TodoCardViewState.NORMAL : TodoCardViewState.EDIT}
        state={data}
        handleMouseUp={props.handleMouseUp} handleDragStart={props.handleDragStart} $draggableCardRef={props.$draggableCardRef} // 드래그
      />);
  }

  return (
    <Column className="droppable" ref={props.$dragEnterableColumnRef} onMouseOver={props.handleMouseOver}>
      {/* 드래그 */}
      <TopBar>
        <Title>{props.title}</Title>
        <CardCnt>{props.todosData.length}</CardCnt>
        <DeleteBtn>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"/>
          </svg>
        </DeleteBtn>
        <AddBtn onClick={props.handleClickAddBtn}>
          <svg width="12" height="12" viewBox="1 1 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.105709 7.53033L0.105709 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105709Z"/>
          </svg>
        </AddBtn>
      </TopBar>
      {renderTodos(props.todosData)}
    </Column>
  );
}

export default TodoColumnPresentational;

const Column = styled.div`
  & + & {
    margin-left: 14px;
  }
  
  display: inline-block;
  vertical-align: top;
  
  z-index: 2;
  height: 1000px;
  padding: 20px;
  box-sizing: border-box;
`;

const TopBar = styled.div`
  width: 300px;
  height: 26px;
  padding: 0 6px;
`;

const Title = styled.div`
  float: left;
  height: 26px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #010101;
`;

const CardCnt = styled.div`
  float: left;
  width: 26px;
  height: 26px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #010101;
  margin: 0px 10px;
  background: #BDBDBD;
  border-radius: 20px;
`;

const AddBtn = styled.button`
  float: right;
  border: none;
  outline: none;
  background-color: transparent;

  svg {
    fill: #BDBDBD;
  }

  &:hover {
    svg {
      fill: #0075DE;
    }
  }
`;

const DeleteBtn = styled.button`
  float: right;
  border: none;
  outline: none;
  background-color: transparent;

  svg {
    fill: #BDBDBD;
  }

  &:hover {
    svg {
      fill: #FF4343;
    }
  }
`;

