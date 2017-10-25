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

//create item
itemRoutes.post('/add', (req, res) => {
	let item = new Item(req.body);

	item.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e);
	});
});

//display 'get' items
itemRoutes.get('/items', (req, res) => {
	Item.find().then((items)=> {
		console.log(items);
		res.send(items);
	}, (e) => {
		res.status(400).send(e);
	});
});

// /get /items/1234
itemRoutes.get('/items/edit/:id', (req,res)=> {
	let id = req.params.id;
	//res.send(req.params);

	if(!ObjectID.isValid(id)) {
		console.log('id is not valid');
		res.status(404).send();
	}
	Item.findOne({
		_id: id,
		// _creator: req.user._id
	}).then((item)=> {
		if(!item) {
			res.status(404).send();
		}
		res.send(item);
		console.log('ItemById', item);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

//put /items/
itemRoutes.put('/items/update/:id', (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['name', 'price']);
	Item.findOneAndUpdate({_id: id}, {$set: body}, {new:true}).then((item) => {
		// console.log(todo);
		if(!item) {
			return res.status(404).send();
		}
		res.send(item);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

//delete item
itemRoutes.delete('/items/delete/:id', (req, res) => {
	let id = req.params.id;

	if(!ObjectID.isValid(id)) {
		console.log('id is not valid');
		res.status(404).send();
	}
	Item.findOneAndRemove({
		_id: id
		// _creator: req.user._id
	}).then((item)=> {
		if(!item) {

			res.status(404).send();
		}
		res.send(item);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

module.exports = itemRoutes;