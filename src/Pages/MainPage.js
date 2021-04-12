import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useDispatch from "../util/hooks/useDispatch";

import HeaderContainer from "../Components/Header/HeaderContainer";
import TodoColumnListContainer from "../Components/TodoColumnList/TodoColumnListContainer";
import SideNavigatorContainer from "../Components/SideNavigator/SideNavigatorContainer";

// import reducer from '../util/reducer';

// todocard: { title: '', content: '', createDate: null, updateDate: null, author: '', },
// todoChange: {title:, date:, author:, action:, from:, to: }
// Date : YYYY-MM-DDTHH:MM;

const MainPage = () => {
  const [todoHistory, setTodoHistory] = useState([]);
  const [events, handleDispatch] = useDispatch();
  
  useEffect(() => {
    setTodoHistory(events)
  }, [todoHistory])

  return (
    <MainLayout>
      <Box>
        <HeaderContainer todoHistory={todoHistory} onDispatch={handleDispatch} />
        <SideNavigatorContainer />
      </Box>
      <TodoColumnListContainer onDispatch={handleDispatch}/>
    </MainLayout>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Responsive = styled.div`
  margin-left: 80px;
  margin-right: 80px;
`;
const MainLayout = styled(Responsive)`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
`;

export default MainPage;
