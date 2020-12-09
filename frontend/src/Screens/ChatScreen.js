import React, { useState } from "react";
import Axios from "axios";

import Messages from "../components/Messages";
import { useSelector } from "react-redux";

const Chat = (props) => {
  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageSubmit = async (message) => {
    console.log("handle submit clocked" + JSON.stringify(userSignIn));
    const data = {
      message,
    };
    const response = await Axios.post("/api/support/register", data, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(response);
    const responseData = {
      text:
        response.data["message"] !== ""
          ? response.data["message"]
          : "Sorry, I can't get it<br>. Can you please repeat once?",
      isBot: true,
    };

    setResponses((responses) => [...responses, responseData]);
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    const message = {
      text: currentMessage,
      isBot: false,
    };
    if (event.key == "Enter") {
      setResponses((responses) => [...responses, message]);
      handleMessageSubmit(message.text);
      setCurrentMessage("");
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <div className="messagesContainer">
          <Messages messages={responses} />
        </div>
        <div className="inputSection">
          <input
            type="text"
            value={currentMessage}
            onChange={handleMessageChange}
            onKeyDown={handleSubmit}
            placeholder="Say something..."
            className="messageInputField"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
