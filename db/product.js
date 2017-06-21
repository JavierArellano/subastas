var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/subastas');
var User = mongoose.model('User');
mongoose.connection.close();


var productSchema = new mongoose.Schema({
	name: 	    String,
	vendedor:   { type: mongoose.Schema.ObjectId, ref: "User"},
	comprador:  { type: mongoose.Schema.ObjectId, ref: "User"},
	vendido:    {type: Boolean, default: false},
	desc:       String,
	precio_sal: Number,
	preciofin:  Number,
	fecha_pub:  { type: Date, default: Date.now},
	fecha_sub:  { type: Date }
})



var Product = mongoose.model('Product', productSchema);

module.exports = Product;