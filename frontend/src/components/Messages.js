import React from "react";
import Message from "./Message";

export default function Messages({ messages }) {
  return (
    <div>
      {messages.map((message) => {
        return (
          <div className="messages">
            <Message message={message}></Message>
          </div>
        );
      })}
    </div>
  );
}
