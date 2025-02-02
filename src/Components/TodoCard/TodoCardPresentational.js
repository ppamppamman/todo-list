import React, {useRef} from 'react';
import styled from 'styled-components';

import { TodoCardViewState } from './const.js';
import PopupMessageContainer from '../PopupMessage/PopupMessageContainer.js';

function TodoCardPresentational(props) {
  const $draggableCardRef = useRef();
  const renderDeletePopup = () => {
    return (
      <PopupMessageContainer
        popupType={false}
        handleConfirmBtn={props.handleClickDeletePopupConfirmBtn}
        handleCancelBtn={props.handleClickDeletePopupCancelBtn}
      />
    )
  }

  const renderNonEdit = () => {
    // TODO, FIXME
    return (
      <div>
        <Caption>{`${props.state.author} by web`}</Caption>
        <DeleteBtn
          onClick={props.handleClickDeleteBtn}
          onMouseOver={props.handleMouseOverDeleteBtn}
          onMouseLeave={props.handleMouseLeaveDeleteBtn}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"/>
          </svg>
        </DeleteBtn>
      </div>
    );
  }

  const renderEdit = () => {
    return (
      <div>
        <CancelBtn onClick={props.handleClickCancelBtn}>취소</CancelBtn>
        <ConfirmBtn
          onClick={props.handleClickConfirmBtn}
          disabled={props.state.title.length > 0 && props.state.content.length > 0 ? false : true}>
            확인
        </ConfirmBtn>
      </div>
    );
  }

  const isDeletePopup = () => props.deletePopup;
  const isEditMode = () => props.viewState === TodoCardViewState.EDIT;

  return (
    <Card className={props.viewState} onDoubleClickCapture={props.handleDoubleClickCapture} // $draggableCardRef.current
      onMouseDown={(e) => {props.handleDragStart(e, props.state)}} onMouseUp={props.handleMouseUp} ref={$draggableCardRef}> {/* 드래그 */}
      <Title
        ref={props.titleRef}
        onChange={props.handleChangeTitle}
        spellCheck={false}
        autoFocus={true}
        placeholder="제목을 입력하세요"
        value={props.state.title}
        disabled={isEditMode() ? false : true} />
      <Content
        ref={props.contentRef}
        onChange={props.handleChangeContent}
        spellCheck={false}
        maxlength="500"
        placeholder="내용을 입력하세요"
        value={props.state.content}
        disabled={isEditMode() ? false : true} />
      {isEditMode() ? renderEdit() : renderNonEdit()}
      {isDeletePopup() ? renderDeletePopup() : null}
    </Card>
  );
}

export default TodoCardPresentational;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: auto;
  position: relative;
  box-sizing: border-box;
  background: #FFFFFF;
  box-shadow: 0px 1px 30px rgba(224, 224, 224, 0.3);
  border-radius: 6px;
  margin-top: 10px;
  user-select: none;

  &:not(.edit, .delete):hover, &.drag-float {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.25);
  }

  &.edit {
    padding: 15px;
    border: 1px solid #0075DE;
  }

  &.delete {
    padding: 15px;
    background-color: #FFEEEC;
    border: 1px solid #FF4343;
  }

  &.drag-origin {
    opacity: 0.4;
    padding: 15px;
    border: 1px solid #0075DE;
  }
`;

const Title = styled.input`
  width: 100%;
  height: 23px;
  box-sizing: border-box;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  color: #010101;
  margin-bottom: 8px;
  border: none;
  outline: none;
  background-color: transparent;

  &:disabled {
    pointer-events: none;

    &::selection {
      background: transparent;
    }
  }
`;

const Content = styled.textarea`
  width: 100%;
	height: 26px;
  resize: none;
  box-sizing: border-box;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #010101;
  margin: 8px 0px;
  border: none;
  outline: none;
  background-color: transparent;

  &:disabled {
    pointer-events: none;

    &::selection {
      background: transparent;
    }
  }
`;

const CancelBtn = styled.button`
  float: left;
  padding: 10px;
  width: 134px;
  height: 40px;
  background: #E0E0E0;
  color: #828282;
  font-weight: 800;
  border: none;
  border-radius: 6px;
  
  &:hover {
    background: #828282;
    color: white;
  }
`;

const ConfirmBtn = styled.button`
  float: right;
  padding: 10px;
  width: 134px;
  height: 40px;
  background: #0075DE;
  color: white;
  font-weight: 800;
  border: none;
  border-radius: 6px;

  &:hover {
    background: #00529B;
  }

  &:disabled {
    background: #86C6FF;
  }
`;

const Caption = styled.div`
  float: left;
  height: 20px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  color: #BDBDBD;
  margin: 10px 0px;
`;

const DeleteBtn = styled.button`
  // TODO, FIXME
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
  /* color: #828282;  */

  svg {
    fill: #828282;
  }

  &:hover {
    top: 15px;
    right: 15px;

    svg {
      fill: #FF4343;
    }
  }
`;

const SvgImg = styled.img`

`;