import React, { useState, useEffect } from 'react';
import { TodoCardViewState } from './const.js';
import TodoCardPresentational from './TodoCardPresentational.js';

function TodoCardContainer(props) {
  const [viewState, setViewState] = useState(props.viewState);
  const [state, setState] = useState(props.state);

  useEffect(() => {
    // TODO
    console.log('call useEffect');
  }, [state]);

  const handleDoubleClickCapture = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setViewState(TodoCardViewState.EDIT);

    evt.target.focus();
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
