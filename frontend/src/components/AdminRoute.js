import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function AdminRoute({ component: Component, ...rest }) {
  // ...rest and props is not needed as we do not pass them to next screen(userProfile). In case we were this code represents how it should be done
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component> // The component defined in PrivateRouter in app.js
        ) : (
          <Redirect to="/signin"></Redirect>
        )
      }
    ></Route>
  );
}
