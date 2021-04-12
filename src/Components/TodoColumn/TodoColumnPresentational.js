import React from 'react'
import styled from 'styled-components';
import { TodoCardViewState } from '../TodoCard/const.js';
import TodoCardContainer from '../TodoCard/TodoCardContainer.js';

function TodoColumnPresentational(props) {
  const renderTodos = (todosData) => {
    return todosData.map(data => 
      <TodoCardContainer
        key={data.id}
        addTodo={props.addTodo}
        deleteTodo={props.deleteTodo}
        viewState={data.createDate ? TodoCardViewState.NORMAL : TodoCardViewState.EDIT}
        state={data}
      />);
  }

  return (
    <Column>
      <TopBar>
        <Title>{props.title}</Title>
        <CardCnt>{props.todosData.length}</CardCnt>
        <DeleteBtn>x</DeleteBtn>
        <AddBtn onClick={props.handleClickAddBtn}>+</AddBtn>
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
  //background-color: #BDBDBD;
  background-color: transparent;
  color: #BDBDBD;

  &:hover {
    /* background-color: #0075DE; */
    color: #0075DE;
  }
`;

const DeleteBtn = styled.button`
  float: right;
  border: none;
  outline: none;
  /* background-color: #BDBDBD; */
  background-color: transparent;
  color: #BDBDBD;

  &:hover {
    /* background-color: #FF4343; */
    color: #FF4343;
  }
`;

