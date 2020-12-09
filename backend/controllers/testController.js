import dialogflow from "dialogflow";

import identity from "../OrderHandleBotProjectYM-5ddb69d09e6e.js";

const projectId = identity.project_id;
const configuration = {
  credentials: {
    private_key: identity.private_key,
    client_email: identity.client_email,
  },
};

const sessionId = "987654";
const languageCode = "en-US";
console.log(configuration);
const sessionClient = new dialogflow.SessionsClient(configuration);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

async function talkToChatbot(message = "5fc375c4b387e50d14b09ace") {
  console.log("message " + message);
  const botRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  const response = await sessionClient.detectIntent(botRequest);

  //console.log(JSON.stringify(response));
  const requiredResponse = response[0].queryResult;
  return requiredResponse;
  // console.log("response:" + response);
  // return response;
}

export default talkToChatbot;
