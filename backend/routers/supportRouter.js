import express from "express";
import expressAsyncHandler from "express-async-handler";
//import runSample from "../controllers/intentController.js";
import talkToChatbot from "../controllers/testController.js";
import { isAuth } from "../utils.js";
import {
  cancelOrderBot,
  changeColor,
  getOrder,
} from "../controllers/orderController.js";
// import bcrypt from "bcryptjs";
// import data from "../data.js";
// import User from "../models/userModel.js";
// import { generateToken, isAuth } from "../utils.js";

const supportRouter = express.Router();

supportRouter.post(
  "/register",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //console.log("calling runsample" + req.body.message);
    const response = await talkToChatbot(req.body.message);
    //console.log(response["fulfillmentText"]);
    //console.log(response);
    switch (response["fulfillmentText"].trim()) {
      case "FetchStatus:1":
        res.send({
          message: "Please Enter OrderId",
        });
        break;
      case "Cancel step 1":
        res.send({
          message: "Please Enter OrderId",
        });
        break;
      case "Fetching details for order": {
        //console.log("inside fetch");
        let resp = await getOrder(String(req.body.message).trim());
        // console.log(resp);
        res.send({
          message: resp + "... Can I help you with anything else?",
        });
        break;
      }
      case "Cancel": {
        let resp = await cancelOrderBot(String(req.body.message).trim());

        res.send({
          message: resp + "... Can I help you with anything else?",
        });
        break;
      }
      case "ColorChange1":
        res.send({
          message:
            "At this point only colour of first product in your order can be changed. Do you want to continue?",
        });
        break;
      case "changecolorAccept":
        res.send({
          message: "Please Enter OrderId and the new colour",
        });
        break;

      case "moreHelp":
        res.send({
          message: "Let me know what i can help you with :)",
        });
        break;
      case "OrderChangePrompt":
        res.send({
          message: "Please type change colour to change colour of product",
        });
        break;
      default: {
        if (response["fulfillmentText"].trim().includes("colorChangeTo")) {
          let st = String(response["fulfillmentText"]).trim();
          let index1 = st.indexOf("\\");
          let index2 = st.indexOf("\\", index1 + 1);
          const colour = st.substring(index1 + 1, index2).trim();
          index1 = st.indexOf("*");
          index2 = st.indexOf("*", index1 + 1);
          const orderId = st.substring(index1 + 1, index2).trim();
          const resp = await changeColor(orderId, colour);
          res.send({
            message: resp + "... Can I help you with anything else?",
          });
        } else {
          //console.log("twertetwet");
          res.send({
            message: response["fulfillmentText"],
          });
        }
        break;
      }
    }
  })
);

export default supportRouter;
