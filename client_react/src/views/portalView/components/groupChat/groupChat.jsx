import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { isStringEmptyUtil } from "../../../../shared/services/util/string-util.service";
import { getTimeFromCurrentUnix } from "../../../../shared/services/util/date-util.service";
import { isArrayEmpty } from "../../../../shared/services/util/array-util.service";
import ChatMessage from './chatMessage';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import IconFile from "../../../../shared/components/iconFile/iconFile";

const GroupChat = () => {
  // all the messages go here
  const [allMessage, setAllMessage] = useState([]);
  const [userNameFromSocket, setUserNameFromSocket] = useState("");
  const [typing, setTyping] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const socket = io("http://localhost:3001");
  const inputRef = useRef();

  useEffect(() => {
    socket.on("nodeObjEvent", onServerListen);
    const messages = JSON.parse(localStorage["messages"]);
    if (messages || !isArrayEmpty(messages)) setAllMessage(messages);

    socket.on("message_delete_event", onMessageDelete);
    return () => {
      // end event listener
      socket.off("nodeObjEvent", onServerListen);
      socket.off("message_delete_event", onMessageDelete);
    };
  }, []);

  useEffect(() => {
    socket.on(
      "typing-from-server",
      (id) => {
        // checking if received user typing is current user
        if (userData.id !== id) typingEvent();
      },
      [socket]
    );
  });

  const onServerListen = (_item) => {
    if (!isStringEmptyUtil(_item.msg)) {
      setAllMessage((prev) => [...prev, { ..._item, msg: _item.msg.trim() }]);
    }
  };

  const onMessageDelete = (_messageId) => {
    setAllMessage(prev => prev.filter(message => message.msg_id != _messageId));
    localStorage.setItem("messages", JSON.stringify(allMessage.filter(message => message.msg_id != _messageId)));
  };

  const onDelete = (messageId) => {
    if (confirm('Are you sure you want to delete?'))
      socket.emit("message_delete", messageId);
  };

  const onSub = (e) => {
    e.preventDefault();
    const message = {
      msg: inputRef.current.value,
      msg_id: crypto.randomUUID(),
      id: userData.id,
      fullName: `${userData.given_name} ${userData.family_name}`,
      time: getTimeFromCurrentUnix(Date.now()),
      img: userData.picture,
    };
    // clear input
    inputRef.current.value = "";
    socket.emit("clientObjEvent", message);
    localStorage.setItem("messages", JSON.stringify([...allMessage, message]));
  };

  const typingEvent = () => {
    setUserNameFromSocket(name);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
    }, 1000);
  };

  const arr = [
    {
      name: "shay",
      icon: 'delete-icon'
    },
    {
      name: "aviv",
      icon: 'check-icon'
    }
  ];

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
                    <div className={`d-flex me-5 mb-2 align-items-center px-2 ${item.id === userData.id && "justify-content-end"}`}>
                      {item.id !== userData.id && <img src={item.img} className="rounded-circle style-my-img-profile me-2" />}
                      <DropdownButton className='col-auto mw-75' id="dropdown-button" title={
                        <ChatMessage message={item} userId={userData.id} isFirstMessage={true} />}>
                        {item.id === userData.id && <Dropdown.Item className="d-flex align-items-center" onClick={() => onDelete(item.msg_id)}>
                          <IconFile iconSrc={'delete-icon'} />
                          <p>Delete</p>
                        </Dropdown.Item>}
                      </DropdownButton>

                      {item.id === userData.id && <img src={item.img} className="rounded-circle style-my-img-profile" />}
                    </div>
                    :
                    // message without avatar image (sec or larger)
                    <div className={`d-flex align-items-center mb-2 px-2 text-wrap ${item.id === userData.id ? "justify-content-end div-host" : "div-guest"}`}>
                      <DropdownButton className='col-auto mw-75' id="dropdown-button" title={
                        <ChatMessage message={item} userId={userData.id} />}>
                        {item.id === userData.id && <Dropdown.Item className="d-flex align-items-center" onClick={() => onDelete(item.msg_id)}>
                          <IconFile iconSrc={'delete-icon'} />
                          <p>Delete</p>
                        </Dropdown.Item>}
                      </DropdownButton>
                    </div>
                }
              </React.Fragment>
            );
          })}
        </div>
        {/* user typing */}
        {
          <div className="typing-container d-flex ms-2">
            {`${typing ? `${userNameFromSocket} typing...` : ""}`}
          </div>
        }

        {/* input message */}
        <form onSubmit={onSub} className="chat-form bg-white p-2 d-flex align-items-center justify-content-center">
          <input onChange={() => socket.emit("typing", userData.id, userData.given_name, userData.family_name)} ref={inputRef} className="form-control me-1" placeholder='Type here...' />
          <button className="btn btn-dark text-white rounded">Send</button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;
