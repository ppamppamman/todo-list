import React from "react";
import PopupMessagePresentational from "./PopupMessagePresentational";
const PopupMessageContainer = () => {
  // PopupMessageContainer로 props 받아서 PopupMessagePresentational로 넘겨주기
  return (
    <div>
      <PopupMessagePresentational /> // props받기
    </div>
  );
};

export default PopupMessageContainer;
