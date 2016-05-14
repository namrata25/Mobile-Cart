var chai = require('chai');
var assert = require('assert');
var productRouter = require('../routes/routes.js');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var request = require('supertest');

var connectionString = 'mongodb://localhost:27017/shopkart';
mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sampleDataProduct = {
	"id": "iphone5c",
	"name": "iPhone 5c",
	"capacity": "16 GB",
	"price": 50000,
	"image": "iphone_5c.png"
}

var sampleDataCart = {
	"id": "iphone5c"
}

describe("Product route : ", function(){
	before(function(){
		app.use('/', productRouter);
	});
	it('product route should return a message', function(done){
		request(app)
					.get('/api/products')
					.expect('content-Type', 'application/json; charset=utf-8')
					.expect(200)
					.end(function(err, res){
						if(err)
							throw err;
						done();
					})
	})
	it('should respond with redirect on post', function(done){
		request(app)
					.post('/api/products')
					.send(sampleDataProduct)
					.expect(200)
					.expect('content-Type', 'application/json; charset=utf-8')
					.end(function(err, res){
						if(err)
							throw err;
						done();

					});
	});
	it('cart route should return data', function(done){
		request(app)
					.get('/api/cart')
					.expect('content-Type', 'application/json; charset=utf-8')
					.expect(200)
					.end(function(err, res){
						if(err)
							throw err;
						done();
					})
	});
	it('should respond with redirect on post', function(done){
		request(app)
					.post('/api/cart')
					.send(sampleDataCart)
					.expect(200)
					.expect('content-Type', 'application/json; charset=utf-8')
					.end(function(err, res){
						if(err)
							throw err;
						done();

					});
	});
});