import React, { useState, useRef } from "react";
import styled from "styled-components";

const PopupMessagePresentational = ({
  popupType,
  handleConfirmBtn,
  handleCancelBtn,
  popupMessage,
}) => {
  // login or delete 나누기
  const [isLogin] = useState(popupType);

  const getName = useRef();

  const handleConfirm = () => {
    handleConfirmBtn(getName.current.value);
  };

  const getTitle = (isLogin) => {
    return isLogin ? (
      <Login>
        <LoginInput ref={getName} type="text" placeholder="ID를 입력하세요." />
      </Login>
    ) : (
      <div>`${"props들어갈자리"}를 삭제하시겠습니까?`</div>
    );
  };

  const getButton = (isLogin) => {
    return isLogin ? (
      <div>
        <LoginButton onClick={handleConfirm}>O K</LoginButton>
      </div>
    ) : (
      <div>
        <CancelButton onClick={handleCancelBtn}>Cancel</CancelButton>
        <DeleteButton onClick={handleConfirmBtn}>Delete</DeleteButton>
      </div>
    );
  };

  return (
    <Modal_background>
      <Modal_card>
        <ModalTitle>{getTitle(isLogin)}</ModalTitle>
        <ModalButton>{getButton(isLogin)}</ModalButton>
      </Modal_card>
    </Modal_background>
  );
};

const ModalTitle = styled.div`
  padding: 15% 0 10% 0;
`;

const Login = styled.div``;
const LoginInput = styled.input`
  width: 300px;
  height: 30px;
`;
const ModalButton = styled.div``;
const LoginButton = styled.button`
  width: 150px;
  height: 40px;
`;

const CancelButton = styled.button`
  border-radius: 6px;
  width: 30%;
  padding: 3%;
  margin-right: 8%;
`;

const DeleteButton = styled.button`
  border-radius: 6px;
  width: 30%;
  padding: 3%;
  margin-left: 8%;
`;

const Modal_background = styled.div`
  position: fixed;
  display: flex;
  z-index: 10;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: -10%;
  top: -10%;
  left: -10%;
  bottom: -10%;
  background-color: rgba(10, 10, 10, 0.86);
`;

const Modal_card = styled.div`
  vertical-align: center;
  width: 350px;
  height: 200px;
  background-color: lightgray;
  border-radius: 5px;
`;

export default PopupMessagePresentational;
