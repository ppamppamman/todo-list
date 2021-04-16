import React, { useState, useRef, useEffect } from 'react';
import * as Action from '../../util/actions/card.js';
import API from '../../util/API.js';
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
    // TODO: loading
  
    // const res = await API.patch.todo({ todoData: state });
    // if (!res.json.success)
    //   throw new Error('todo patch fail');

    const isUpdate = state.createTime !== null;
    const currTime = new Date().valueOf();
    const newState = { ...state,
      createTime: state.createTime ?? currTime,
      updateTime: currTime
    };

    if (isUpdate)
      props.updateTodo({ todoData: newState });
    else
      props.addTodo({ todoData: newState });

    setState({...newState});
    setViewState(TodoCardViewState.NORMAL);
    props.dispatch({ action: isUpdate ? Action.UPDATE_CARD : Action.ADD_CARD, ...newState });
  };
  
  const handleClickDeleteBtn = async () => {
    // TODO: PopupMessage

    // const res = await API.delete.todo({ todoData: state });
    // if (!res.json.success)
    //   throw new Error('todo delete fail');

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
      handleMouseUp={props.handleMouseUp} handleDragStart={props.handleDragStart} $draggableCardRef={props.$draggableCardRef} // 드래그 
      state={state}
      viewState={viewState}
    />
  );
}

export default TodoCardContainer;
