# FlipZon

This is a fully functional online shopping website with all essential components added including payments solution. 

Simply download the code and run npm install for all dependencies to be installed. 

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

