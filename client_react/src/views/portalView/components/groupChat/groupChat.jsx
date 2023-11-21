import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { isStringEmptyUtil } from '../../../../shared/services/util/string-util.service';
import { getTimeFromCurrentUnix } from '../../../../shared/services/util/date-util.service';

const GroupChat = () => {
  // all the messages go here 
  const [allMessage, setAllMessage] = useState([]);
  const [userNameFromSocket, setUserNameFromSocket] = useState("");
  const [typing, setTyping] = useState(false);
  const socket = io("http://localhost:3001");
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
  }, []);

  useEffect(() => {
    socket.on("typing-from-server", (id, name) => {
      // checking if received user typing is current user
      if (userData.id !== id) {
        setUserNameFromSocket(name);
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
        }, 1000);
      }
    }, [socket]);
  });


  const onServerListen = (_item) => {
    if (!isStringEmptyUtil(_item.msg)) {
      setAllMessage((prev) => [...prev, { ..._item, msg: _item.msg.trim() }]);
      // save messages on local storage
      localStorage.setItem('messages', JSON.stringify(allMessage));
    }
  };

  const onSub = (e) => {
    e.preventDefault();
    console.log(userData);
    const message = {
      msg: inputRef.current.value,
      id: userData.id,
      fullName: `${userData.given_name} ${userData.family_name}`,
      time: getTimeFromCurrentUnix(Date.now()),
      img: userData.picture,
    };
    // clear input 
    inputRef.current.value = "";
    socket.emit("clientObjEvent", message);
  };

  return (
    <div className="container">
      <div className="w-100 border border-3 rounded-2 border-dark mx-auto col-md-6 mt-3">
        <div className="p-2 chat-container">
          {allMessage.map((item, i) => {
            return (
              <React.Fragment key={i}>
                {
                  // message with avatar image
                  allMessage[i].id !== allMessage[i - 1]?.id ?
                    <div className={`d-flex me-5 align-items-center p-2 ${item.id === userData.id && "justify-content-end"}`}>
                      {
                        <React.Fragment>
                          {item.id !== userData.id && <img src={item.img} className="rounded-circle style-my-img-profile me-2" />}
                          <div className={`${item.id === userData.id ? "bg-teal-dark" : "bg-dark bg-opacity-50"} col-auto mw-75 py-2 ps-2 pe-3 mb-3 text-break rounded`}>
                            <p className="text-warning">{item.fullName}</p>
                            <h4 className="text-white font-weight-light">{item.msg}</h4>
                            <p className="text-muted fs-6 mt-2">{item.time}</p>
                          </div>
                          {item.id === userData.id && <img src={item.img} className="rounded-circle style-my-img-profile" />}
                        </React.Fragment>
                      }
                    </div>
                    :
                    // message without avatar image (sec or larger)
                    <React.Fragment>
                      {
                        <div className={`d-flex align-items-center p-2 text-wrap ${item.id === userData.id ? "justify-content-end div-host" : "div-guest"}`}>
                          <div className={`${item.id === userData.id ? "bg-teal-dark" : "bg-dark bg-opacity-50"} col-auto mw-75 py-2 ps-2 pe-3 mb-3 text-break rounded`}>
                            <h4 className="text-white font-weight-light">{item.msg}</h4>
                            <p className="text-muted fs-6 mt-2">{item.time}</p>
                          </div>
                        </div>
                      }
                    </React.Fragment>
                }
              </React.Fragment>
            );
          })}
        </div>
        {/* user typing */}
        {<div className="typing-container d-flex ms-2"> {`${typing ? `${userNameFromSocket} typing...` : ''}`}</div>}

        {/* input message */}
        <form onSubmit={onSub} className="chat-form bg-white p-2 d-flex align-items-center justify-content-center">
          <input onChange={() => socket.emit("typing", userData.id, userData.given_name, userData.family_name)} ref={inputRef} className="form-control me-1" placeholder='Type here...' />
          <button className="btn btn-dark">Send</button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;
