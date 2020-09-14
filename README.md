# Flipr-Hackathon-6-Covid19

## Requirements to build app
**1. Reactjs** 
- npx create-react-app covid

**2. Json-Server**
- npm install json-server –g json-server –watch db.json –p 3001 –d 2000
- Here db.json is json data required for drawing graph and ‘localhost:3001/data’ will act as api

**3. Bootstrap**
- npm i bootstrap

**4. ReactStrap**
- npm i reactstrap react react-dom

**5. Chartjs**
- npm install --save react-chartjs-2 chart.js

**6. Axios**
- npm install axios --save

**7.Paginate**
- npm install react-paginate --save

#### Note
- (Commands work for windows)

### Steps to run the app:

- Clone the project and install all dependencies mentioned above.
- Go to path project->server->json-server and run server using command “json-server –watch db.json –p 3001 –d2000”.
- Go to path project->client->covid and run command “npm start”.
