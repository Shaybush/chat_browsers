import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";

const GroupChat = () => {
  // all the messages go here 
  const [allMessage, setAllMessage] = useState([]);
  const [userNameFromSocket, setUserNameFromSocket] = useState("")
  const [typing, setTyping] = useState(false);
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

  useEffect(() => {
    socket.on("typing-from-server", (id,name) => {
      // checking if received user typing is current user
      if(userData.id !== id)
      {
        setUserNameFromSocket(name)
        setTyping(true)  
        setTimeout(() => {
          setTyping(false);
        },1000)
      }
    }, [socket])})

  
  const onServerListen = (_item) => {
    if (_item.msg !== "") {
      setAllMessage((prev) => [...prev, { ..._item, msg: _item.msg.trim() }]);
      //save messages on 
      localStorage.setItem('messages', JSON.stringify(allMessage));
    }
  };

  const onSub = (e) => {
    e.preventDefault();
    const item = {
      msg: inputRef.current.value,
      id: userData.id,
      hours: time.getHours() < 10 ? "0" + time.getHours() : time.getHours(),
      minutes: time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes(),
      img: userData.picture,
    };
    inputRef.current.value = "";
    socket.emit("clientObjEvent", item);
  };

  return (
    <div className="container">
      <div className="w-100 border border-3 rounded-2 border-dark mx-auto col-md-6 mt-3 " id="div_message">
        <div className='p-2 chat-container'>
          {allMessage.map((item, i) => {
            return (
              <>
                 {
                 allMessage[i].id !== allMessage[i - 1]?.id ?                
                 <div className={`d-flex me-5 align-items-center p-2 ${item.id === userData.id ? 'justify-content-end' : ''}`}>
                 {
                  item.id === userData.id ?
                  <>
                <div className={`${item.id === userData.id ? 'bg-teal-dark' : 'bg-dark bg-opacity-50'} col-auto mw-100 text-black py-2 px-3 mb-3 text-break text-right text-end rounded`}>
                  <h4 className='text-white'>
                  <h6 className="text-muted mb-2">{userData.given_name} </h6>
                    {item.msg}
                    <p className='text-muted text-sm mt-2'>
                      {item.hours}:{item.minutes}
                    </p>
                  </h4>
                </div>
                 <img src={item.img} className="rounded-circle style-my-img-profile"/> 
                   </>
                    :
                  <>
                 <img src={item.img} className="rounded-circle style-guest-profile"/> 
                  <div className={`${item.id === userData.id ? 'bg-teal-dark' : 'bg-dark bg-opacity-50'} col-auto mw-100 text-black py-2 px-3 mb-3 text-break text-right text-end rounded `}>
                  <h4 className='text-white'>
                  <h6 className="mb-2 me-4 float-lg-start ">{userData.given_name} </h6>
                    {item.msg}
                    <p className='text-muted text-sm mt-2'>
                      {item.hours}:{item.minutes}
                    </p>
                  </h4>
                </div>
                     </>    
                 }
                 </div>
                :  
               <div className={`d-flex align-items-center p-2 text-wrap ${item.id === userData.id ? 'justify-content-end' : ''} style-div`} key={i}>
                <div className={`${item.id === userData.id ? 'bg-teal-dark flex-column-reverse' : 'bg-dark bg-opacity-50'} col-auto mw-100 text-black py-2 px-3 mb-3 text-break text-right text-end rounded`}>
                  <h4 className='text-white'>
                    {item.msg}
                    <p className='text-muted text-sm mt-2'>
                      {item.hours}:{item.minutes}
                    </p>
                  </h4>
                </div>
              </div>
                }
              </> 
            );
          })}
        </div>
        {/* user typing */}
            {
              typing && <h6 className="d-flex m-2 mb-0 font-weight-bold"> {userNameFromSocket} typing...</h6>
            }
        <form onSubmit={onSub} className="chat-form bg-white p-2 d-flex align-items-center justify-content-center">
          <input onChange={()=> socket.emit("typing",userData.id,userData.given_name)} ref={inputRef} className="form-control me-1" id="id_input" placeholder='Type here...' />
          <button className="btn btn-dark">Send</button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;
