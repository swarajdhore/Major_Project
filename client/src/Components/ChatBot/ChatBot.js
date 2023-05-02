import React, { useState, useEffect } from "react";
import ToggleVisibility from "../UI/ToggleVisiblity";
import SendButton1 from "../UI/Buttons/SendButton1";
import "./ChatBot.css";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const [show, setShow] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    // function sendFirstMessage() {
    // TODO: Replace this with code to send a message to the chatbot
    // setChatHistory((prevChatHistory) => [
    //   ...prevChatHistory,
    //   { user: message, bot: "Sending first message..." },
    // ]);
    function handleSendMessageForChatbot() {
      // Your code to send the message through the chatbot goes here
      setChatHistory(() => [
        // ...prevChatHistory,
        // user: message,
        {
          bot: `Hello! I am yours Autobot.
                Always at your service.
                Vahan Trade is here to bring your expectations into reality.
                I can guide you about our Vahan Trade.
                Ask away!`,
        },
      ]);

      setMessageCount(messageCount + 1);
    }
    handleSendMessageForChatbot();
    console.log("Sending first message...");
    // }

    // sendFirstMessage();
    handleSendMessageForChatbot();
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const imageU =
    "https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png";
  const imageB =
    "https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png";

  const imageBot = process.env.PUBLIC_URL + "/images/logo/bot.png";
  const imgBot =
    "https://w7.pngwing.com/pngs/529/418/png-transparent-computer-icons-internet-bot-eyes-miscellaneous-people-sticker-thumbnail.png";

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
    <div className="">
      <ToggleVisibility buttonText={imgBot} messageCount={messageCount}>
        <div class="d-flex justify-content-center ">
          <div class=" d-flex justify-content-center">
            <div class="card mt-5">
              <div class="d-flex flex-row justify-content-between p-3 adiv bg-[#04CB28] text-white rounded-b-xl">
                <i class="fas fa-chevron-left"></i>
                <span class="pb-3">AutoBot</span>
                <i class="fas fa-times"></i>
              </div>
              <div className="chat-bot-wrapper text-xs">
                {chatHistory.map((chat, index) => (
                  <div key={index}>
                    <div class="d-flex flex-column p-3">
                      {/* <img src={imageU} width="30" height="30" /> */}
                      <div class="text-xs chat ml-2 p-3">{chat.user}</div>
                    </div>
                    <div class="bg-white mr-2 p-3">
                      <span class="text-muted">{chat.bot}</span>
                    </div>
                    {/* <img src={imageB} width="30" height="30" /> */}
                  </div>
                ))}
              </div>
              <div class="flex justify-evenly align-center form-group text-2xl">
                <input
                  class="form-control text-2xl py-3 mt-2.5"
                  placeholder="Type your message"
                  value={message}
                  onChange={handleMessageChange}
                ></input>
                <button onClick={handleSendMessage}>
                  <SendButton1 />{" "}
                </button>
                {/* <button
                  onClick={handleSendMessage}
                  className="btn btn-inside btn-boarder"
                >
                  <img
                    src="https://i.cloudup.com/gBzAn-oW_S-2000x2000.png"
                    width="64px"
                    height="64px"
                    id="plane"
                  />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </ToggleVisibility>
    </div>
  );
}

export default ChatBot;

/* <div className="my-8 box-content bg-[#ffffff] px-6 rounded-md">
          <h1 className="bg-[#5391F7] w-full">My Chatbot</h1>
          <div className="text-sm">
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <div>
                  <span className="rounded-full  absolute left-12 ">
                    <img
                      src={imageU}
                      alt=""
                      className="rounded-full"
                      width="35px"
                      height="50px"
                    />
                  </span>
                  <p className="px-2 py-8 text-left ml-6 mr-3 my-2 bg-[#E2FFE8] rounded-md">
                    {chat.user}
                  </p>
                </div>
                <div>
                  <span className="rounded-full  absolute right-12 ml-2">
                    <img
                      src={imageB}
                      alt=""
                      className="rounded-full align-middle"
                      width="35px"
                      height="10px"
                    />
                  </span>
                  <p className="px-2 py-8 text-right ml-6 mr-3 my-2 bg-white border-2 rounded-md">
                    {chat.bot}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              className="rounded-md mx-2 my-2"
              value={message}
              onChange={handleMessageChange}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div> */
