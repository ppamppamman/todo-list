import React, {useState, useEffect} from 'react'

const useDispatch = () => {
  const [events, setEvents] = useState([]);

  const handleDispatch = (evt) => {
    console.log("useDispatch", evt);
    setEvents(evt);
  }

  return [events, handleDispatch];
}

export default useDispatch;
