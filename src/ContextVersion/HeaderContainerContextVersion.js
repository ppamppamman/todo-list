import React, {useContext} from 'react';
import HeaderPresentational from './HeaderPresentational';

import { TodoContext } from '../../Pages/MainPage';
import { ADD_CARD } from '../../util/actions/card';

function HeaderContainer() {
  const todoContext = useContext(TodoContext);
  return (
    <div>
      헤더 컨테이너
      <button onClick={() => { todoContext.dispatch(ADD_CARD); }}> test </button>
    </div>
  )
}

export default HeaderContainer
