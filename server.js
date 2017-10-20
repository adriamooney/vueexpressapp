require('./config/config');
const express = require('express');
const path = require('path');
const _ = require('lodash');
const bodyParser = require('body-parser');
const cors = require('cors');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');

// const itemRoutes = require('./expressRoutes/items');

const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use('/items', itemRoutes); //this router is not working

const {Item} = require('./models/Item');


app.post('/add', (req, res) => {
	let item = new Item(req.body);

	item.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/items', (req, res) => {
	Item.find().then((items)=> {
		console.log(items);
		res.send(items);
	}, (e) => {
		res.status(400).send(e);
	});
});

//get /items/1234
app.get('/items/edit/:id', (req,res)=> {
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
app.put('/items/update/:id', (req, res) => {
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
app.delete('/items/delete/:id', (req, res) => {
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


      
const port = process.env.PORT;

const server = app.listen(port, () => {
	console.log(`server running on ${port}`);
});