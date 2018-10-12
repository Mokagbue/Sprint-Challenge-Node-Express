console.log("Howdy from index.js!");

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');

const server = express();

server.use(express.json());
server.use(logger('combined'));
server.use(cors());
server.use(helmet());

const actionRoutes = require('./actions/actionRoutes.js');
const projectRoutes = require('./projects/projectRoutes.js');

server.use('/actions', actionRoutes);
server.use('/projects', projectRoutes);

//Middleware
const timeStamp = (req, res, next) => {
    console.log(`${Date.now()} ${req.method} made to ${req.url}`)
    next();
};

// Server Tester Message
server.get('/', (req, res) => {
    res.send('Good morning, your server is working!!');
});

 const port = 7000;
 server.listen(port, () => console.log(`API raining fire cats and dogs on this port ${port}`));
;