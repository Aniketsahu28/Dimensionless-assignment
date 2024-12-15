Todo reminder app: https://todoreminderapp.vercel.app/

Steps to follow to run the same on local machine :

step 1 : Clone the repository

BACKEND PART :

step 2: Move to server folder (cd server)

step 2a: npm install

step 2b : Create a .env file in the server folder and add the following fields:

MONGO_URI=<your_mongo_uri>

PORT=<your_port_number>

step 2c : npm run dev

FRONTEND PART

step 3 : Move to client folder (cd client)

step 3a : Create a .env file in the frontend folder and add the following field:

VITE_BACKEND_URL=<your_backend_url>

Replace <your_backend_url> with the URL of your backend (e.g., http://localhost:3000 or the deployed backend URL).

step 3b : npm run dev

For testing api

In the todo.test.js file, use the following in the beforeAll function to set the testing MongoURI:
beforeAll(async () => {
  process.env.MONGO_URI = 'your_testing_mongo_uri';
});

npm test
