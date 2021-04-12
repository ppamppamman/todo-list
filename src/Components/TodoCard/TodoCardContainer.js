import React, { useState, useRef, useEffect } from 'react';
import Global from '../../global.js';
import * as Action from '../../util/actions/card.js';
import { TodoCardViewState } from './const.js';
import TodoCardPresentational from './TodoCardPresentational.js';

function TodoCardContainer(props) {
  const [state, setState] = useState(props.state);
  const [viewState, setViewState] = useState(props.viewState);
  const [$currFocus, setCurrFocus] = useState(); // is this right convention?
  const titleRef = useRef();
  const contentRef = useRef();
  const [initialTitle] = useState(state.title);
  const [initialContent] = useState(state.content);

  useEffect(() => {
    if (viewState === TodoCardViewState.EDIT && $currFocus) {
      $currFocus.focus();
      _cursorToEnd($currFocus);
    }
  }, [viewState]);

  useEffect(() => {
    _resizeContentHeight();
  }, [titleRef, contentRef]);

  const _cursorToEnd = ($input) => {
    $input.selectionEnd = $input.selectionEnd + $input.value.length;
    $input.selectionStart = $input.selectionEnd;
  }

  const _resizeContentHeight = () => {
    if (contentRef.current.clientHeight < contentRef.current.scrollHeight)
      contentRef.current.style.height = `${contentRef.current.scrollHeight + 4}px`;
  }

  const handleDoubleClickCapture = (evt) => {
    if (viewState === TodoCardViewState.EDIT)
      return;

    evt.stopPropagation();
    evt.preventDefault();
    setViewState(TodoCardViewState.EDIT);
    
    if (evt.nativeEvent.layerY >= contentRef.current.offsetTop)
      setCurrFocus(contentRef.current);
    else
      setCurrFocus(titleRef.current);
  };

  const handleChangeTitle = ({ target }) => {
    setState({ ...state, title: target.value });
  };

  const handleChangeContent = ({ target }) => {
    setState({ ...state, content: target.value });
  };

  const handleClickCancelBtn = () => {
    setViewState(TodoCardViewState.NORMAL);

    if (state.createTime)
      setState({ ...state, title: initialTitle, content: initialContent });
    else
      props.deleteTodo(state.id);
      
    // TODO: PopupMessage
  };

  const handleClickConfirmBtn = () => {
    // TODO: loading, network logic
    const currTime = new Date();
    setState({ ...state, createTime: state.createTime ?? currTime.valueOf(), updateTime: currTime.valueOf() });
    setViewState(TodoCardViewState.NORMAL);
    props.dispatch({ action: Action.ADD_CARD, ...state });
  };

  const handleClickDeleteBtn = () => {
    // TODO: PopupMessage
    // TODO: network logic
    props.deleteTodo(state.id);
    props.dispatch({ action: Action.DELETE_CARD, ...state });
  };

  const handleMouseOverDeleteBtn = () => {
    setViewState(TodoCardViewState.DELETE);
  }

  const handleMouseLeaveDeleteBtn = () => {
    setViewState(TodoCardViewState.NORMAL);
  }

  return (
    <TodoCardPresentational
      titleRef={titleRef}
      contentRef = {contentRef}
      handleDoubleClickCapture={handleDoubleClickCapture}
      handleChangeTitle={handleChangeTitle}
      handleChangeContent={handleChangeContent}
      handleClickCancelBtn={handleClickCancelBtn}
      handleClickConfirmBtn={handleClickConfirmBtn}
      handleClickDeleteBtn={handleClickDeleteBtn}
      handleMouseOverDeleteBtn={handleMouseOverDeleteBtn}
      handleMouseLeaveDeleteBtn={handleMouseLeaveDeleteBtn}
      state={state}
      viewState={viewState}
    />
  );
}

export default TodoCardContainer;
