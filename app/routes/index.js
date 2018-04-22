var express = require('express');
var router = express.Router();

const controllerA = require('../controllers/controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dogs', controllerA.getDogs);

router.post('/dogs', controllerA.postDogs);

module.exports = router;
