import React, { useState, useRef, useEffect } from 'react';
import Global from '../../global.js';
import { TodoCardViewState } from './const.js';
import TodoCardPresentational from './TodoCardPresentational.js';

function TodoCardContainer(props) {
  const _initialState = {
    todoId: '',
    author: '',
    title: '',
    content: '',
    createDate: null,
    updateDate: null,
  };

  const [state, setState] = useState(props.state ?? _initialState);
  const [viewState, setViewState] = useState(props.viewState);
  const [currFocus, setCurrFocus] = useState();
  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    if (viewState === TodoCardViewState.EDIT) {
      currFocus.focus();
      _cursorToEnd(currFocus);
    }
  }, [viewState]);

  const _cursorToEnd = ($input) => {
    $input.selectionEnd = $input.selectionEnd + $input.value.length;
    $input.selectionStart = $input.selectionEnd;
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
    if (target.clientHeight < target.scrollHeight)
      target.style.height = `${target.scrollHeight + 4}px`;

    setState({ ...state, content: target.value });
  };

  const handleClickCancelBtn = ({ target }) => {
    // TODO: delete logic
    setViewState(TodoCardViewState.NORMAL);
  };

  const handleClickConfirmBtn = ({ target }) => {
    // TODO: network logic
    setViewState(TodoCardViewState.NORMAL);
  };

  const handleClickDeleteBtn = ({ target }) => {
    // TODO
    console.log('click deleteBtn');
  };

  const handleMouseOverDeleteBtn = ({ target }) => {
    setViewState(TodoCardViewState.DELETE);
  }

  const handleMouseLeaveDeleteBtn = ({ target }) => {
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
