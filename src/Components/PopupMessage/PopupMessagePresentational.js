import React, { useState, useRef } from "react";
import styled from "styled-components";

const PopupMessage = () => {
  // login or delete 나누기
  const [login, setLogin] = useState(true);
  const [show, setShow] = useState(true);

  const handleModalClose = () => setShow(false);

  // x 버튼 눌렀을 시 handleModalOpen 함수를 실행시키면 됨.
  const handleModalOpen = () => setShow(true);

  const getTitle = (login) => {
    return login ? (
      <Login>
        <LoginInput
          ref={name}
          type="text"
          placeholder="사용하실 닉네임을 작성하세요."
        />
      </Login>
    ) : (
      <div>`${"props들어갈자리"}를 삭제하시겠습니까?`</div>
    );
  };

  const name = useRef();
  const setName = () => {
    setLogin(true);
    // 여기서 데이터베이스? 로 네임을 보내주는 작업을 해야한다.
    handleModalClose();
  };

  const setDeleteCallBack = () => {
    // 여기서 callBack으로 삭제했다는 값을 보내주면된다.
  };

  const getButton = (login) => {
    return login ? (
      <div>
        <LoginButton onClick={setName}>O K</LoginButton>
      </div>
    ) : (
      <div>
        <CancelButton onClick={handleModalClose}>Cancel</CancelButton>
        <DeleteButton onClick={setDeleteCallBack}>Delete</DeleteButton>
      </div>
    );
  };

  return (
    <div hidden={!show} mode={login}>
      <Modal_background>
        <Modal_card>
          <ModalTitle>{getTitle(login)}</ModalTitle>
          <ModalButton>{getButton(login)}</ModalButton>
        </Modal_card>
      </Modal_background>
    </div>
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
  width: 20%;
  height: 20%;
  background-color: lightgray;
  border-radius: 5px;
`;

export default PopupMessage;
