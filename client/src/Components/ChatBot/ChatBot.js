import React, { useState } from "react";
import ToggleVisibility from "../UI/ToggleVisiblity";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  var msg1;
  const handleSendMessage = async (event) => {
    event.preventDefault();
    console.log(message);
    const response = await fetch("http://localhost:7000/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((msg) => {
        setMessage(msg);
        console.log(msg);
        msg1 = msg;
      })
      .catch((error) => console.error(error));

    // console.log(response);

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { user: message, bot: msg1.message },
    ]);

    setMessage("");
  };
  return (
    <ToggleVisibility>
      <div className="my-16  box-content bg-slate-200 px-16">
        <h1>My Chatbot</h1>
        <div>
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <p>You: {chat.user}</p>
              <p>Bot: {chat.bot}</p>
            </div>
          ))}
        </div>
        <div>
          <input type="text" value={message} onChange={handleMessageChange} />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </ToggleVisibility>
  );
}

export default ChatBot;
