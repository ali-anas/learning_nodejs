const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

/*
morgan is middleware used to log
additional information to the screen.
*/
app.use(morgan('dev'));

/*
This tells express server to serve up
static files from location
*/
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.json());

// mounting dishRouter route to /dishes path
// requests coming to /dishes endpoint will 
// be handled by dishRouter.
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);



// next is used when we need any extra middleware(optional)
app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server Running at https://${hostname}:${port}`);
});