import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import HistoryCard from "./History/HistoryCard";

function SideNavigator({ todoHistory, mode, setMode }) {
  // 필요한 props
  // author, title, column:(해야할 일 or 하고 있는 일 or 완료한 일), function:(등록, 삭제, 변경, 이동)

  const Navigator = useRef(null);

  const handleMode = () => {
    setMode(false);
    // setTimeout(() => {
    //   handleDisplay();
    // }, 350);
  };

  // const handleDisplay = () => {
  //   Navigator.current.style.display = "none";
  // };

  return (
    <Bar style={{ mode }} ref={Navigator}>
      <BarHeader>
        <UpdateList src="https://i.ibb.co/41qDxpc/2021-04-13-4-01-04.png" />
        <Close_btn onClick={handleMode}>❌</Close_btn>
      </BarHeader>

      {/* todoHistory를 그냥 reverse를 하게되면 useState의 배열값이
      넘어오기때문에 변경되지 않는다. 따라서 todoHistory를 shallow copy 하여
      reverse를 해주어야한다. */}

      {[...todoHistory]
        .reverse()
        .map(({ title, date, author, action, from, to }, index) => {
          return (
            <HistoryCard
              key={index}
              date={date}
              title={title}
              author={author}
              action={action}
              from={from}
              to={to}
            />
          );
        })}
    </Bar>
  );
}

const Close_btn = styled.div`
  display: flex;
  align-items: center;
  margin: 3% 5%;
  font-size: 20px;
  cursor: pointer;
`;

const slideIn = keyframes`
    from{
        opacity:0;
        transform: translateX(382px);
    }
    to {
        opacity:1;
        transform: translateX(0px);
    }
`;

const slideOut = keyframes`
    from{
        opacity:1;
        transform: translateX(0px);
    }
    to {
        opacity:0;
        transform: translateX(382px);
    }
`;

const Bar = styled.div`
  position: absolute;
  z-index: ${(props) => (props.style.mode ? 1 : -1)};
  box-sizing: border-box;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  border: 1px solid black;
  background-color: white;

  overflow: scroll;

  animation-duration: 0.35s;
  animation-timing-function: ease-in-out;
  animation-name: ${(props) => (props.style.mode ? slideIn : slideOut)};
  opacity: ${(props) => (props.style.mode ? 1 : 0)};
  animation-fill-mode: forwards;
`;

const BarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const UpdateList = styled.img`
  margin: 3% 0;
  width: 50%;
  transform: rotate(10deg);
`;

export default SideNavigator;
