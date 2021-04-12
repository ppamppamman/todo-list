import React, { useState } from "react";
import styled from "styled-components";

const PopupMessage = () => {
  const [show, setShow] = useState(true);

  const handleModalClose = () => setShow(false);

  const handleModalOpen = () => setShow(true);

  return (
    <div hidden={!show}>
      <Modal_background>
        <Modal_card>
          <ModalTitle>props.title 받을자리</ModalTitle>
          <CancelButton onClick={handleModalClose}>Cancel</CancelButton>
          <DeleteButton>props.type 받을자리</DeleteButton>
        </Modal_card>
      </Modal_background>
    </div>
  );
};

const ModalTitle = styled.div`
  padding: 20% 0;
`;

const CancelButton = styled.button`
  border-radius: 6px;
  width: 40%;
  padding: 5%;
  margin-right: 5%;
`;

const DeleteButton = styled.button`
  border-radius: 6px;
  width: 40%;
  padding: 5%;
  margin-left: 5%;
`;

const Modal_background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -10%;
  top: -10%;
  left: -10%;
  bottom: -10%;
  background-color: rgba(10, 10, 10, 0.86);
`;

const Modal_card = styled.div`
  vertical-align: center;
  width: 20%;
  height: 25%;
  background-color: lightgray;
  border-radius: 5px;
`;

export default PopupMessage;
