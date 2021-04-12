import React from "react";
import styled, { keyframes } from "styled-components";
import HistoryCard from "./History/HistoryCard";

function SideNavigator({ mode, setMode }) {
  // 필요한 props
  // author, title, column:(해야할 일 or 하고 있는 일 or 완료한 일), function:(등록, 삭제, 변경, 이동)

  const obj = [
    {
      id: 1,
      author: "neis",
      title: "git",
      column: "해야할 일",
      selectCondition: "등록",
    },
    {
      id: 2,
      author: "pampam",
      title: "javascript",
      column: "하고 있는 일",
      selectCondition: "제거",
    },
    {
      id: 3,
      author: "peng",
      title: "node",
      column: "완료한 일",
      selectCondition: "이동",
    },
  ];

  const handleMode = () => setMode(false);

  return (
    <Bar style={{ mode }}>
      <BarHeader>
        <UpdateList>Update List</UpdateList>
        <Close_btn onClick={handleMode}>EXIT</Close_btn>
      </BarHeader>
      {obj.reverse().map((v, index) => {
        return (
          <HistoryCard
            key={index}
            title={v.title}
            author={v.author}
            column={v.column}
            selectCondition={v.selectCondition}
          />
        );
      })}
    </Bar>
  );
}

const Close_btn = styled.div`
  margin: 3% 5%;
  font-size: 20px;
  cursor: pointer;
`;

const slideIn = keyframes`
    from{
        opacity:0;
        transform: translateX(200px);
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
        transform: translateX(200px);
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
`;

const BarHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UpdateList = styled.p`
  margin: 3% 5%;
  font-size: 20px;
`;

export default SideNavigator;
