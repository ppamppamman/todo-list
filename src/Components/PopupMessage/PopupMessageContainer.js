import React from "react";
import PopupMessagePresentational from "./PopupMessagePresentational";
const PopupMessageContainer = (props) => {
  // PopupMessageContainer로 props 받아서 PopupMessagePresentational로 넘겨주기
  return (
    <div>
      <PopupMessagePresentational
        handleConfirmBtn={props.handleConfirmBtn}
        handleCancelBtn={props.handleCancelBtn}
        popupType={props.popupType}
      />
    </div>
  );
};

export default PopupMessageContainer;
