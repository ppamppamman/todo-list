import React, { useReducer } from 'react'
import styled from 'styled-components';
import HeaderContainer from '../Components/Header/HeaderContainer';
import TodoColumnListContainer from '../Components/TodoColumnList/TodoColumnListContainer';

import reducer from '../util/reducer';

export const TodoContext = React.createContext();

const MainPage = () => {
  
  const [todos, dispatch] = useReducer( reducer, {} );
  // const handleChangeCard = ({type, value}) => {}
  console.log("todos", todos)
  return (
    <TodoContext.Provider 
      value={ {todos: todos, dispatch: dispatch} }
    >
      <MainLayout>
       <HeaderContainer />
       <TodoColumnListContainer />
      </MainLayout>
    </TodoContext.Provider>
    
  )
}

const Responsive = styled.div`
  margin-left: 80px;
`
const MainLayout = styled(Responsive)`
  width: 100%;
  
  display: flex;
  flex-direction: column;
`;

export default MainPage
