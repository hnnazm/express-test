const express = require('express')
const router = express.Router()

router.get('/hey', function(req, res) {
    res.send('Hey World')
})

// pass multiple params in url
router.get('/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 });

 // only allow 5 digits id
router.get('/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
});

router.post('/', function (req, res) {
    res.send('Got a POST request')
})

//Other routes here
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

//export this router to use in our index.js
module.exports = router;
