var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('catalog', ['products']);
app	.use(bodyParser.json());
app.get('/', function(req, res){
	res.send('it works');
});
app.get('/products', function(req, res){
	console.log('fetching products');
	db.products.find(function(err, docs){
		if (err) {
			res.send(err);
		}else{
			console.log('sending products');
			res.json(docs);
		}
	});
	//res.send('prducts works');
});
app.get('/products/:id', function(req, res){
	console.log('fetching products');
	db.products.findOne({_id:mongojs.ObjectId(req.params.id)}, function(err, doc){
		if (err) {
			res.send(err);
		}else{
			console.log('sending product');
			res.json(doc);
		}
	});
});

app.post('/products', function(req, res){
	db.products.insert(req.body, function(err, doc){
		if (err) {
			console.log('error occured');
			res.send(err);
		}else{
			console.log('doc submittted');
			res.json(doc);
		}
	})
});

app.put('/products/:id', function(req, res){
	db.products.findAndModify({query: {_id:mongojs.ObjectId(req.params.id)},
		update:{$set: {
			name: req.body.name,
			category: req.body.category
		}},
		new: true
	}, function(err, doc){
		if (err) {
			console.log('error occured');
			res.send(err);
		}else{
			console.log('updating product');
			res.json(doc);
		}
	})
});
app.delete('/products/:id', function(req, res){
	db.products.remove({query: {_id:mongojs.ObjectId(req.params.id)}}, function(err, doc){
		if (err) {
			console.log('error occured');
			res.send(err);
		}else{
			console.log('doc delete');
			res.json(doc);
		}
	})
});

app.listen(4000);
console.log('Server started at 4000');