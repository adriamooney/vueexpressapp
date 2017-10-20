const express = require('express');
const itemRoutes = express.Router();
const Item = require('../models/Item');

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// // define the home page route
// router.get('/', function (req, res) {
//   res.send('Birds home page')
// })
// // define the about route
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })


itemRoutes.post('/add', (req, res) => {
	let item = new Item(req.body);

	item.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e);
	});
});

module.exports = itemRoutes;