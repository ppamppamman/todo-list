import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import API from "../../util/API";
import Global from "../../global";
import SideNavigatorPresentational from "./SideNavigatorPresentational";

const SideNavigatorContainer = ({ todoHistory }) => {
  const {
    mode,
    setMode,
    play,
    count,
    setCount,
    handleClick,
  } = useHeaderContainer();
  return (
    <Box>
      <NavigationInput
        src="https://i.ibb.co/mGZXBvH/2021-04-13-5-08-50.png"
        type="button"
        mode={String(mode)}
        onClick={handleClick}
      />
      {play && (
        <SideNavigatorPresentational
          todoHistory={todoHistory}
          mode={mode}
          setMode={setMode}
          count={count}
          setCount={setCount}
        ></SideNavigatorPresentational>
      )}
    </Box>
  );
};

const useHeaderContainer = () => {
  const [mode, setMode] = useState(false);
  const [play, setPlay] = useState(false);
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setMode((prevMode) => !prevMode);
    setPlay(true);
    setCount(count + 1);
  };

  return {
    mode,
    setMode,
    play,
    setPlay,
    count,
    setCount,
    handleClick,
  };
};

const Box = styled.div`
  padding: 5% 0;
  width: 350px;
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

const NavigationInput = styled.img`
  cursor: pointer;
  width: 80px;
  padding-top: 5px;
  box-sizing: border-box;
  background-color: white;
  outline: none;
  border: none;
  &:active {
    transform: translateY(2px);
  }

  animation-duration: 0.35s;
  animation-timing-function: ease-in-out;
  animation-name: ${(props) => (props.mode === "true" ? null : slowView)};
`;

export default SideNavigatorContainer;
