//lets require/import the mongodb native drivers.
var mongoose = require('mongoose');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/shopkart';

// Use connect method to connect to the Server
var productSchema = mongoose.Schema({
    "id" : String,
        "name": String,
        "capacity": String,
        "price": Number,
        "image": String,
        "description": String,
        "versionKey":false
    });
var Product = mongoose.model("product", productSchema);
mongoose.connect(url);
    console.log('Connection established to', url);

    //Create some users
    var product1 = new Product({
        "id": 2,
        "name": "iPhone 5c",
        "capacity": "32 GB",
        "price": 55000,
        "image": "images/iphone_5c.png",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    });
   
    var product2 = new Product( {
        "id": 3,
        "name": "iPhone 5s",
        "capacity": "16 GB",
        "price": 60000,
        "image": "images/iphone_5s.png",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    });
    var product3 = new Product( {
        "id": 5,
        "name": "iPhone 6",
        "capacity": "16 GB",
        "price": 70000,
        "image": "images/iphone_6.png",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    });

    // Insert some users
    product1.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('inserted 1 document');
      }
    });
    product2.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('inserted 1 document');
      }
    });
    product3.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('inserted 1 document');
      }
    });