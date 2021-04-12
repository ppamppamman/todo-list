import React from "react";
import styled from "styled-components";

export default function TodoCard({
  keyValue,
  title,
  author,
  column,
  selectCondition,
}) {
  // 여기로 프롭스를 받아서 map 으로 리턴.

  const handleColumn = ({
    keyValue,
    title,
    author,
    column,
    selectCondition,
  }) => {
    return column === "해야할 일" ? (
      <Content keyValue={keyValue}>
        <Name>{"@" + author}</Name>
        <Text style={{ keyValue, title, author, column, selectCondition }}>
          {author}가 {column}에 {title}를 {selectCondition}
          하였습니다.
        </Text>
      </Content>
    ) : column === "하고 있는 일" ? (
      <Content keyValue={keyValue}>zz</Content>
    ) : (
      <Content keyValue={keyValue}>zz</Content>
    );
  };

  return (
    <div>
      {handleColumn({ keyValue, title, author, column, selectCondition })}
    </div>
  );
}

const Name = styled.div`
  text-align: left;
  font-size: 18px;
  font-style: oblique;
  padding-bottom: 10px;
`;

const Text = styled.div`
  font-size: 20px;
  ${(props) => {
    console.log(props.style);
  }}
`;

const Content = styled.div`
  word-break: break-all;
  padding: 2% 20%;
  height: 20%;
`;
