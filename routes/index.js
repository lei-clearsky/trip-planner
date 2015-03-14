var express = require('express');
var router = express.Router();
var models = require('../models/');

module.exports = function() {

	router.get('/', function(req, res) {

		models.Hotel.find({}, function(err, hotels) {
		    models.Restaurant.find({}, function(err, restaurants) {
		        models.ThingToDo.find({}, function(err, thingsToDo) {
		            res.render('home', {
		                all_hotels: hotels,
		                all_restaurants: restaurants,
		                all_things_to_do: thingsToDo
		            });
		        });
		    });
		});
	});

	return router;

}