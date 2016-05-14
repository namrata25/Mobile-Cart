var mongoose = require("mongoose");
var cartSchema = mongoose.Schema({
		"id" : String,
        "name": String,
        "capacity": String,
        "price": Number,
        "image": String,
        "quantity": Number
    });

module.exports = mongoose.model("cart", cartSchema);