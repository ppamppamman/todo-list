import React, { useState } from "react";
import styled from "styled-components";
import * as actions from "../../../util/actions/card";

const HistoryCard = ({
  title,
  createTime,
  updateTime,
  makeTime,
  author,
  action,
  from,
  to,
}) => {
  const getText = (title, action, from, to) => {
    switch (action) {
      case actions.MOVE_CARD:
        return (
          <div>
            <BoldText>{title}</BoldText>를 <BoldText>{from}</BoldText>에서
            <BoldText>{to}</BoldText>로 이동하였습니다.
          </div>
        );

      case actions.UPDATE_CARD:
        return (
          <div>
            <BoldText>{from}</BoldText>의 <BoldText>{title}</BoldText>를
            변경하였습니다.
          </div>
        );

      case actions.ADD_CARD:
        return (
          <div>
            <BoldText>{from}</BoldText>에 <BoldText>{title}</BoldText>를
            등록하였습니다.
          </div>
        );

      case actions.DELETE_CARD:
        return (
          <div>
            <BoldText>{from}</BoldText>에 <BoldText>{title}</BoldText>를
            제거하였습니다.
          </div>
        );
    }
  };

  const timeForToday = (time) => {
    const today = new Date();
    const inputTime = new Date(time);
    const betweenTime = Math.floor(
      (today.getTime() - inputTime.getTime()) / 1000
    );
    return betweenTime < 1 ? "1분전" : `${betweenTime}분전`;
  };

  const getTime = (action, createTime, updateTime, makeTime, to) => {
    switch (action) {
      case actions.MOVE_CARD:
        return timeForToday(to);

      case actions.UPDATE_CARD:
        return timeForToday(updateTime);

      case actions.ADD_CARD:
        return timeForToday(makeTime);

      case actions.DELETE_CARD:
        return ``;
    }
  };

  return (
    <Card>
      <Emoji>🥳</Emoji>
      <Content>
        <Name>{"@PNP"}</Name>
        <Text>{getText(title, action, from, to)}</Text>
        <Time>
          {getTime(action, createTime, updateTime, makeTime, from, to)}
        </Time>
      </Content>
    </Card>
  );
};

const BoldText = styled.span`
  font-weight: bold;
`;

const Emoji = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-left: 15px;
  font-size: 35px;
`;

const Content = styled.div`
  padding: 7px 20px;
`;

const Name = styled.div`
  text-align: left;
  font-size: 18px;
  font-style: oblique;
  padding-bottom: 12px;
`;

const Text = styled.div`
  font-size: 19px;
  line-height: 30px;
  text-align: initial;
`;

const Time = styled.div`
  font-size: 15px;
  text-align: left;
  padding-top: 16px;
  color: #828282;
`;

const Card = styled.div`
  display: flex;
  word-break: break-all;
  padding: 2% 5%;
  width: 90%;
  margin: 3%;
  box-sizing: border-box;
  background-color: #c5e0f9;
`;

export default HistoryCard;
