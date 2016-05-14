var mongoose = require("mongoose");
var productSchema = mongoose.Schema({
		"id" : String,
        "name": String,
        "capacity": String,
        "price": Number,
        "image": String,
        "description": String,
        "versionKey":false
    });

module.exports = mongoose.model("product", productSchema);