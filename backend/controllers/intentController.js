import dialogflow from "dialogflow";
import { v4 as uuid } from "uuid";

const runSample = async function () {
  // A unique identifier for the given session
  console.log("inside run sample");
  const sessionId = uuid.v4;

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename:
      "E:/WebD/E-CommerceReplica/backend/OrderHandleBotProjectYM-5ddb69d09e6e.json",
  });
  let sessionPath = null;
  try {
    sessionPath = sessionClient.sessionPath(
      "orderhandlebotprojectym",
      sessionId
    );
  } catch (error) {
    console.log(error);
  }

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: "hello",
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };
  console.log(request);
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log(responses);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
};

export default runSample;
