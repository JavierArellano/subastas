var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username:   String,
	nombre: 	String,
	apellidos:  String,
	descripcion:String,
	tlf:        String,
	email:      String,
	qxws:       String,
	monedas: {type: Number, default:100},
	admin: {type: Boolean, default: false},
	fecha_creacion: { type: Date, default: Date.now}
})


var User = mongoose.model('User', userSchema);

module.exports = User;