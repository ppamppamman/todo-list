import React from "react";
import styled from "styled-components";

export default function HistoryCard({
  title,
  author,
  column,
  selectCondition,
}) {
  const handleColumn = ({
    title,
    // BeforeTitle,
    // AfterTitle,
    author,
    column,
    BeforeColumn,
    AfterColumn,
    selectCondition,
  }) => {
    return selectCondition === "이동" ? (
      <Content>
        <Name>{"@" + author}</Name>
        <Text>
          {title}를 {BeforeColumn}에서 {AfterColumn}으로 {selectCondition}
          하였습니다.
        </Text>
        <Time>분전</Time>
      </Content>
    ) : selectCondition === "변경" ? (
      <Content>
        <Name>{"@" + author}</Name>
        <Text>
          {title}로 {selectCondition}
          하였습니다.
        </Text>
        <Time>분전</Time>
      </Content>
    ) : (
      <Content>
        <Name>{"@" + author}</Name>
        <Text>
          {column}에 {title}를 {selectCondition}
          하였습니다.
        </Text>
        <Time>분전</Time>
      </Content>
    );
  };

  return <div>{handleColumn({ title, author, column, selectCondition })}</div>;
}

const Name = styled.div`
  text-align: left;
  font-size: 18px;
  font-style: oblique;
  padding-bottom: 12px;
`;

const Text = styled.div`
  font-size: 20px;
  line-height: 30px;
`;

const Time = styled.div`
  font-size: 15px;
  text-align: left;
  padding: 2%;
`;

const Content = styled.div`
  word-break: break-all;
  box-sizing: border-box;
  padding: 2% 5%;
  height: 20%;
`;
