import React from "react";

export default function MessageBox(props) {
  return (
    <div>
      <div className={`alert alert-${props.variant || "info"}`}>
        {console.log(props.children)}
        {props.children}
      </div>
    </div>
  );
}
