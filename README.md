## nginx-express-mongodb-init

### API template 
This project uses a simple nginx reverse proxy server
to expose API endpoints to the web. The endpoints are 
written in expressjs and use mongodb as a database.

To use this project for a real use case you need to 
modify the insert/update/query/delete functions in API.js
and modify the body of the expressjs endpoints in server.js

### todo
CI/CD integration script to install keys and create a github action
that restarts and updates whever changes are pushed

pm2 monitoring and crash recovery implementation

implement subscription endpoint that will fire http post
requests to a list of subscribers whenever an event fires

