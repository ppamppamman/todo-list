import React from "react";
import styled from "styled-components";
import * as actions from "../../../util/actions/card";

export default function HistoryCard({ title, date, author, action, from, to }) {
  // 핸들링 되는것을 함수로 쪼개라
  // DELETE, MOVE

  // const handleColumn = ({ title, date, author, action, from, to }) => {
  // return selectCondition === actions.MOVE_CARD;
  //스위치문으로만들어보자
  // };

  return (
    <div>
      <Content>
        <Name>{"@" + author}</Name>
        <Text>{title}</Text>
        <Time>분전</Time>
      </Content>
    </div>
  );
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
