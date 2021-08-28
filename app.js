const express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer()
const app = express()
const port = 3000

const things = require('./routes/things')

// templating (pug)
app.set('view engine', 'pug');
app.set('views', './views');

// static file
app.use(express.static('public'))

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/form', function (req, res) {
    res.render('form');
});

app.post('/form', function (req, res) {
    console.log(req.body);
    res.send("recieved your request!");
});

app.get('/static', function (req, res) {
    res.render('testimage')
})

app.get('/:id', function (req, res) {
    res.render('first_view', {                                  // templating
        id: req.params.id
    });
    // res.send('The id you specified is ' + req.params.id);
});

app.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id === '0') next('route')
    // otherwise pass the control to the next middleware function in this stack
    else next()
}, function (req, res, next) {
    // send a regular response
    res.send('regular')
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', function (req, res, next) {
    res.send('special')
})

// middleware
// simple request time logger
app.use('/things', function (req, res, next) {
    console.log("A new request received at " + Date.now());

    // This function call is very important. It tells that more processing is
    // required for the current request and is in the next middleware
    // function/route handler.
    next();
});

app.use('/things', things)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})