import React from "react";

export default function Message({ message }) {
  return (
    <div className="messageCard">
      {message.isBot ? (
        <div className="messageContainer botCard">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{message.text}</p>
          </div>
        </div>
      ) : (
        <div className="messageContainer userCard">
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{message.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}
