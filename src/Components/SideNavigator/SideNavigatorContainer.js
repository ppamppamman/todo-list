import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import SideNavigator from "./SideNavigatorPresentational";

const SideNavigatorContainer = ({ todoHistory }) => {
  const { mode, setMode, play, handleClick } = useHeaderContainer();

  return (
    <Box>
      <NavigationInput
        type="button"
        mode={String(mode)}
        value={mode ? "" : "MENU"}
        onClick={handleClick}
      />
      {play === "start" && (
        <SideNavigator
          todoHistory={todoHistory}
          mode={mode}
          setMode={setMode}
        ></SideNavigator>
      )}
    </Box>
  );
};

const useHeaderContainer = () => {
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
  ${(props) => console.log(props)}
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

  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-name: ${(props) => (props.mode === "true" ? null : slowView)};
`;

export default SideNavigatorContainer;
