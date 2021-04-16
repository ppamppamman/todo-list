import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Global from '../global.js';
import API from '../util/API.js';
import useDispatch from "../util/hooks/useDispatch";

import HeaderContainer from "../Components/Header/HeaderContainer";
import TodoColumnListContainer from "../Components/TodoColumnList/TodoColumnListContainer";
import SideNavigatorContainer from "../Components/SideNavigator/SideNavigatorContainer";
import PopupMessageContainer from "../Components/PopupMessage/PopupMessageContainer";

// import reducer from '../util/reducer';

// todocard: { title: '', content: '', createDate: null, updateDate: null, author: '', },
// todoHistory: {title:, date:, author:, action:, from:, to: }
// Date : YYYY-MM-DDTHH:MM;

const MainPage = () => {
  const [todoHistory, setTodoHistory] = useState([]);
  const [events, handleDispatch] = useDispatch();
  const [popupType, setPopupType] = useState(true);
  const [loginPopup, setLoginPopup] = useState(true);

  const handleLoginPopupButton = async (userId) => {
    const res = await API.get.userName({ userId });
    if (!res)
      throw new Error('not registered ID');

    Global.setUser(res);
    setLoginPopup(false);
  };

  const handleLoginPopupCancelBtn = () => {
    setLoginPopup(false);
  };

  useEffect(() => {
    setTodoHistory(events);
  }, [events]);

  return (
    <MainLayout className="main">
      {loginPopup ?
        (
          <PopupMessageContainer
            popupType={popupType}
            handleCancelBtn={handleLoginPopupCancelBtn}
            handleConfirmBtn={handleLoginPopupButton}
          />
        ) :
        (
          <div>
          <Box>
            <HeaderContainer />
            <SideNavigatorContainer
              todoHistory={todoHistory}
              onDispatch={handleDispatch}
            />
          </Box>
          <TodoColumnListContainer onDispatch={handleDispatch} />
          </div>
        )
      }
    </MainLayout>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Responsive = styled.div`
  padding-left: 80px;
  padding-right: 80px;
  box-sizing: border-box;
`;
const MainLayout = styled(Responsive)`
  width: 100%;

  /* display: flex; */
  flex-direction: column;
`;

export default MainPage;
