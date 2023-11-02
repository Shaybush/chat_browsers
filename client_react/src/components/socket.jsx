import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
// provide id to browser
const user_id = crypto.randomUUID();

export default function Socket() {
  // all the messages go here 
  const [msg_ar, setMsgAr] = useState([]);
  const socket = io("http://localhost:3001/");
  const inputRef = useRef();

  useEffect(() => {
    socket.on("nodeObjEvent", onServerListen);
    return () => {
      // end event listener
      socket.off("nodeObjEvent", onServerListen);
    };
  });

  const onServerListen = (_item) => {
    setMsgAr([...msg_ar, _item]);
  };

  const onSub = (e) => {
    e.preventDefault();
    const item = {
      msg: inputRef.current.value,
      id: user_id
    };
    socket.emit("clientObjEvent", item);
  };

  return (
    <div className="container mx-auto">
      <div className="chat-container border border-3 rounded-2 border-dark mx-auto col-md-6 mt-3" id="div_message">
        <div className='chat-messages p-2'>
          {msg_ar.map((item, i) => {
            return (
              <div className={`d-flex align-items-center ${item.id === user_id ? 'justify-content-end' : ''}`}>
                <h4 className={`${item.id === user_id ? 'bg-success' : 'bg-dark bg-opacity-25'} col-4 rounded-2 text-white p-2`} key={i}>{item.msg}</h4>
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
