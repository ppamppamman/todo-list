import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import SideNavigator from "./SideNavigatorPresentational";

const SideNavigatorContainer = () => {
  const { mode, setMode, play, handleClick } = useHeaderContainer();

  return (
    <Box>
      {/* 펭도리 수정부분 */}
      <NavigationInput
        type="button"
        mode={mode}
        value={mode ? "" : "MENU"}
        onClick={handleClick}
      />
      {play === "start" ? (
        <SideNavigator mode={mode} setMode={setMode}></SideNavigator>
      ) : null}
    </Box>
  );
};

const useHeaderContainer = (e) => {
  const [mode, setMode] = useState(false);
  const [play, setPlay] = useState("end");
  const handleClick = () => {
    setMode((prevMode) => !prevMode);
    setPlay("start");
  };
  return {
    mode,
    setMode,
    play,
    setPlay,
    handleClick,
  };
};

const Box = styled.div`
  padding: 5% 0;
  box-sizing: border-box;
`;

const slowView = keyframes`
from{
      opacity:0;
  }
  to {
      opacity:1;
  }
`;

const NavigationInput = styled.input`
  cursor: pointer;
  padding: 5% 0;
  box-sizing: border-box;
  font-size: 20px;
  background-color: white;
  outline: none;
  border: none;
  &:active {
    transform: translateY(2px);
  }

  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
  animation-name: ${(props) => (props.mode ? null : slowView)};
`;

export default SideNavigatorContainer;
