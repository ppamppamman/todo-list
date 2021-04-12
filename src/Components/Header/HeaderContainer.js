import React from "react";
import styled from "styled-components";
import HeaderPresentational from "./HeaderPresentational";

function HeaderContainer() {
  // 투두 히스토리, 샛투두 히스토리

  return (
    <Container>
      <HeaderPresentational />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  font-size: 20px;
  padding: 5% 0;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
`;

export default HeaderContainer;
