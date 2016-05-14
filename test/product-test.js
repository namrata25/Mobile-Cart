var express = require('express');
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema();
var request = require('request'); //or supertest
var expect = chai.expect;
var assert = require('assert');

describe('/api/products', function(){

	var schema = {

			"id" : String,
        	"name" : String,
        	"capacity" : String,
        	"price" : Number,
        	"image" : String,
        	"description" : String
    	}

    describe('GET PRODUCTS', function(){

		it('GET should respond with 200 success', function(done){

			request({
				url: 'http://localhost:3000/api/products',
				method: 'GET',
				headers: {
					'content-Type': 'application/json'
				}
			},
			function(error, res, body){
				console.log('in function');
				if(error){
					console.log('in error');
					return done(error);
				}
			
				expect(res.statusCode).to.equal(200);

				console.log(body);
				expect(validator.validate(body, schema)).to.be.true;
			});
			done();
		});
	});
	

	describe('POST PRODUCTS', function(){

		var sampleData1 = {
			"id" : "1",
			"name" : "iPhone 6s",
			"capacity" : '16 GB',
			"price" : 60000,
			"image" : "/image/iphone_6s.png",
			"description" : "hakuna matata"
		}

		it('should respond with 200 success', function(done){

			request({
				url: 'http://localhost:3000/ap/products',
				method: 'POST',
				headers: {
					'content-Type': 'application/json'
				},
				json: sampleData1
			},
			function(error, res, body){
				if(error)
					return done(error);

				expect(res.statusCode).to.equal(200);

				expect(validator.validate(body,schema)).to.be.true;
			});
			done();
		});
	});

	
});