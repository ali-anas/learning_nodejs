const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

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

app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (req, res, next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
    res.end('Will add the dish: ' + req.body.name+
        ' with details: '+req.body.description);
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
});

app.delete('/delete', (req, res, next) => {
    res.end('Deleting all the dishes!');
});


app.all('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will send details of the dish: ' 
        + req.params.dishId + 'to you.');
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'
        + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: '+ req.params.dishId + 
        '\n');
    res.end('Will update the dish: ' + req.body.name
        + 'with details: ' + req.body.description);
});

app.delete('/delete/:dishId', (req, res, next) => {
    res.end('Deleting the dish: ' + req.params.dishId);
});

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