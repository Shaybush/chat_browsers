import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";

export default function Socket() {
  // all the messages go here 
  const [allMessage, setAllMessage] = useState([]);
  const time = new Date();
  const socket = io("http://localhost:3001/");
  const inputRef = useRef();
  const userData = JSON.parse(localStorage.getItem("userData"));

  //get all message from local storage 
  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem("messages"));
    if (messages) {
      setAllMessage(messages);
    }

  }, []);

  useEffect(() => {
    socket.on("nodeObjEvent", onServerListen);
    return () => {
      // end event listener
      socket.off("nodeObjEvent", onServerListen);
    };
  });
  const onServerListen = (_item) => {
    setAllMessage((prev) => [...prev, _item]);
    allMessage.push(_item);
    //save messages on 
    localStorage.setItem('messages', JSON.stringify(allMessage));
  };

  const onSub = (e) => {
    e.preventDefault();
    const item = {
      msg: inputRef.current.value,
      id: userData.id,
      hours: time.getHours() < 10 ? "0" + time.getHours() : time.getHours(),
      minutes: time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
    };
    socket.emit("clientObjEvent", item);
  };
  return (
    <div className="container mx-auto">
      <div className="chat-container w-100 h-auto border border-3 rounded-2 border-dark mx-auto col-md-6 mt-3" id="div_message">
        <div className='chat-messages p-2'>
          {allMessage.map((item, i) => {
            return (
              <div className={`d-flex align-items-center text-wrap ${item.id === userData.id ? 'justify-content-end' : ''}`}>
                <h4 className={`${item.id === userData.id ? 'bg-success' : 'bg-dark bg-opacity-25'} col-4 rounded-2 text-black p-2 w-30 text-break text-right text-end`} key={i}>
                  {item.msg}
                  <div className="d-flex flex-row-reverse grow-5">
                    <div className='text-muted text-sm mt-3'>
                      {item.hours}:{item.minutes}
                    </div>
                    <img src={userData.picture} className="rounded-pill" />
                  </div>
                </h4>
              </div>
            );
          })}
        </div>
        <form onSubmit={onSub} className="chat-form bg-white p-2 d-flex align-items-center justify-content-center">
          <input ref={inputRef} className="form-control me-1" id="id_input" />
          <button className="btn btn-dark">Send</button>
        </form>
      </div>
    </div>
  );
}
