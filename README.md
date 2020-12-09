# FlipZon

This is a fully functional online shopping website with all essential components added including payments solution. 

Simply download the code and run npm install for all dependencies to be installed. 

it is adviced to run npm install once on the root directory and once on the front end folder (cd frontend.   npm install) as front end folder contains react specific dependencies .

To be able to use chat bot you need google server credentials. just paste the json file in backend directory and  make sure content of file is same (replace value with your cloud credentials)

const identity = {
  project_id: "value",
  private_key_id:"value" ,
  private_key:"value",
  client_email:"value",
};
export default identity;

same above with whatever name.json you want and in backend/controllers/intentController make sure you change the following

const sessionClient = new dialogflow.SessionsClient({
    keyFilename:
      "E/rootdir/backend/OrderHandleBotProjectYM-5ddb69d09e6e.json", // replace with your path where above .json file is kept
  });

To run simply from root folder go to cd backend and type npm start. This starts the backend server. Check the log to see which port is used

then from root folder in a new terinal go to cd frontend type npm start.Check the log to see which port is used. At  this point front end will crash. No issues

Make sure you have MongoDB installed in your system. 

Considering your backend port to be 5000. Begin by going to follwing url on your browser when backend server is running: http://localhost:5000/api/products/seed

This will populate your mongoDB with products that will be used by our front end to populate the home page.


In the root folder in command window type " npm start " to start the backend server

Now in another window type cd frontend to enter the frontend folder. Again type " npm start " to start the REact server which will open the website. 

Register yourself to the site and start shopping! (Not For real though)

Make sure to add a .env file in root folder and add the variables like JWT encoding secret and paypal client ID. THESE SHOULD NOT BE COMMITTED hence hidden.


Structure of Code :

The project is majorly devided into frontend and backend folders.

In the frontend folder inside src we will find 5 major folders as per react standards

Reducers actions , constants components and screens and a store.js file for the redux store.
Other than this index.css for styling and index.js, app.js which contains the skeleton.
Within App.js the body is routed to various screens.

In Backend we have developed API's which feed our front end the required data

All communication is handled by AXIOS. The structure is relatively easy to understand even for beginners.

Any addition / collaboration is welcomed 

Cheers

