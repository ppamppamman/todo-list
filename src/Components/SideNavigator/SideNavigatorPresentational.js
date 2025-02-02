import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import HistoryCard from "./History/HistoryCard";

function SideNavigator({ todoHistory, mode, setMode, count, setCount }) {
  // 필요한 props
  // author, title, column:(해야할 일 or 하고 있는 일 or 완료한 일), function:(등록, 삭제, 변경, 이동)
  const handleMode = () => setMode(false);

  const repeatNavigatorView = useRef(null);

  useEffect(() => {
    const repeat = () => {
      setTimeout(() => {
        repeatNavigatorView.current = count;
        setCount(count + 1);
      }, 1000);
    };
    if (mode) repeat();
  }, [count]);

  return (
    <Bar style={{ mode }}>
      <BarHeader>
        <UpdateList src="https://i.ibb.co/41qDxpc/2021-04-13-4-01-04.png" />
        <Close_btn onClick={handleMode}>❌</Close_btn>
      </BarHeader>

      {/* todoHistory를 그냥 reverse를 하게되면 useState의 배열값이
      넘어오기때문에 변경되지 않는다. 따라서 todoHistory를 shallow copy 하여
      reverse를 해주어야한다. */}

      <div ref={repeatNavigatorView}>
        {[...todoHistory]
          .reverse()
          .map(
            (
              { title, updateTime, author, action, from, to, columnId },
              index
            ) => {
              console.log(columnId);
              return (
                <HistoryCard
                  key={index}
                  updateTime={updateTime}
                  title={title}
                  author={author}
                  action={action}
                  to={to}
                  columnId={columnId}
                  mode={mode}
                />
              );
            }
          )}
      </div>
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
