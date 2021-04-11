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
  const [$currFocus, setCurrFocus] = useState();
  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    if (viewState === TodoCardViewState.EDIT && $currFocus) {
      $currFocus.focus();
      _cursorToEnd($currFocus);
    }
  }, [viewState]);

  useEffect(() => {
    _resizeContentHeight();
  }, [state]);

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
//    if (target.clientHeight < target.scrollHeight)
//      _resizeContentHeight(target);

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
