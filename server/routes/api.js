var IP = require('../../dirip');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer  = require('multer')
var upload = multer({ dest: '/uploads/' })
var fs = require('fs');
var im = require('imagemagick');
var User = require('../../db/user');
var Product = require('../../db/product');
var Chat = require('../../db/chat');



// Add headers
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://'+IP.IP+':3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});



/* GET ALL CHATS */
router.get('/chat/:room', function(req, res) {
	var room = req.params.room;
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
  	Chat.find({ "room":room }, function (err, chats) {
    	if (err) return next(err);
    	mongoose.connection.close();
    	res.json(chats);
  });
});



/* SAVE CHAT */
router.post('/chat', function(req, res, next) {
	var croom = req.body.room;
	var cnickname = req.body.nickname;
	var cmessage = req.body.message;
	var cupdated_at = req.body.updated_at;

	mongoose.connect('mongodb://'+IP.IP+'/subastas');

	var newChat = Chat({
		room: croom,
		nickname: cnickname,
		message: cmessage,
		updated_at: cupdated_at
	})
	newChat.save(function(err) {
  		if (err) throw err;

  		console.log('chat creado!');
	});
	mongoose.connection.close();
    res.send(newChat);
});





/* POST */

router.post('/nu', (req, res) => {
	var uname = req.body.username;
	var name = req.body.name;
	var apell = req.body.lastname;
	var email = req.body.email;
	var pass = req.body.passw;
	
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	var newUser = User({
		username: uname,
		nombre: name,
		apellidos: apell,
		email: email,
		qxws: pass
	});

	newUser.save(function(err) {
  		if (err) throw err;

  		console.log('Usuario creado!');
	});
	mongoose.connection.close();
	res.send({"creado":true});
});

router.post('/check_user', (req, res) => {
	var username = req.body.username;
	var pass = req.body.pass;
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	User.find({"username":username, "qxws": pass}, function (err, user){	
		mongoose.connection.close();
		if (user.length == 1) {
			res.send(user[0]);
		}
		if (err) {
			throw err;
			res.send({"error":err});
		}
	});
});

router.post('/upload', upload.single('image'), (req,res) =>{
	var imageNameFinal;
	var p_name = req.body.name;
	var p_vendedor = req.body.userid;
	var p_desc = req.body.descripcion;
	var p_salida = req.body["precio-inicial"];

	
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	var newProduct = Product({
		name: p_name,
		vendedor: p_vendedor,
		desc: p_desc,
		precio_sal: p_salida
	});

	newProduct.save(function(err) {
  		if (err) throw err;

  		console.log('Producto creado!');
	});
	mongoose.connection.close();

	fs.readFile(req.file.path, function (err, data) {
	    var imageName = req.file.originalname;
	    if(!imageName){
			console.log("There was an error")
			res.redirect("/");
			res.end();
	    } else {
	    	imageName = newProduct["_id"]+".jpg"
			var newPath = __dirname + "./../../uploads/fullsize/" + imageName;
			fs.writeFile(newPath, data, function (err) {
			});
	    }
	});
	res.redirect("/");
});
router.post('/edituser', upload.single('image'), (req,res) =>{
	var imageNameFinal;
	var id = req.body.userid;
	var u_name = req.body.name;
	var u_uname = req.body.uname;
	var u_apell = req.body.apellidos;
	var desc = req.body.descripcion;
	var tlf = req.body.tlf;
	var email = req.body.email;

	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	console.log(texto);
	User.findOneAndUpdate({"_id":id},{"nombre":u_name,"username":u_uname,"apellidos":u_apell,"descripcion":desc,"tlf":tlf,"email":email},function(err, resp) {
		console.log(err);
		console.log(resp);
		});
	mongoose.connection.close();
	if(req.file){
		fs.readFile(req.file.path, function (err, data) {
		    var imageName = req.file.originalname;
		    if(!imageName){
				console.log("There was an error")
				res.redirect("/");
				res.end();
		    } else {
		    	imageName = id+".jpg"
				var newPath = __dirname + "./../../uploads/fullsize/" + imageName;
				fs.writeFile(newPath, data, function (err) {
				});
		    }
		});
	}
	res.redirect("/");
});

// Cambio de contraseña.

router.post('/cambiopass', (req,res)=>{
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	User.findOneAndUpdate({"_id":"594847d114aa0b13445dc988"},{"qxws":"a14f8a540e78dae706d255750010a0f8"},function(err, resp) {
			});
	mongoose.connection.close();
});

/* END POST */

/* GET */

router.get('/image', (req,res)=>{
	var id = req.query.id;
	var img;
	var Path = __dirname + "./../../uploads/fullsize/"+id+".jpg";
	fs.readFile(Path, (err, data) => {
  		if (err) {
  			var Path = __dirname + "./../../uploads/fullsize/perfil.jpg";
			var img = fs.readFileSync(Path);
			res.writeHead(200, {'Content-Type': 'image/gif' });
    		res.end(img, 'binary');
  		}else{
			res.writeHead(200, {'Content-Type': 'image/gif' });
		    res.end(data, 'binary');
		};
	});
});

// ruta para obtener los productos que un usuario ha comprado: /api/productoscomprados?id={{userid}}
router.get('/productoscomprados', (req, res) => {
	var id = req.query.id;
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	Product.find({"comprador":id}, function(err, product) {
		if (err) throw err;
		User.populate(product, {path: "vendedor", select: '-qxws', select: '-monedas', select:'-admin'}, function(err, product) {
			if (err) throw err;
			mongoose.connection.close();
			res.send(product);
		})
	})
})
// ruta para obtener los productos de un usuario que han sido vendidos: /api/productosvendidos?id={{userid}}
router.get('/productosvendidos', (req, res) => {
	var id = req.query.id;
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	Product.find({"vendedor":id, "vendido":true }, function(err, product) {
		if (err) throw err;
		User.populate(product, {path: "comprador", select: '-qxws', select: '-monedas', select:'-admin'}, function(err, product) {
			if (err) throw err;
			mongoose.connection.close();
			res.send(product);
		})
	})
});
// ruta para obtener los productos de un usuario que no han sido vendidos: /api/productosnovendidos?id={{userid}}
router.get('/productosnovendidos', (req, res) => {
	var id = req.query.id;
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	Product.find({"vendedor":id, "vendido":false }, function(err, product) {
		if (err) throw err;

		mongoose.connection.close();
		
		res.send(product);
	})
});
// ruta para obtener los datos de un usuario : /api/userdata?id={{userid}}
router.get('/userdata', (req, res) => {
	var id = req.query.id;
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	User.find({"_id":id}, function(err, user) {
		if (err) throw err;

		mongoose.connection.close();
		
		res.send(user);
	})
});

// Para comprar un producto tienes que pasar como parametros 
// los id del producto, del comprador y del vendedor,
// y el precio final del producto: 
// la url seria  <<direccion>>/api/compra?idp=<<>>&idc=<<>>&idv=<<>>&precio=<<>>
router.get('/puja',(req,res)=>{
	var idp = req.query.idp;
	var idc = req.query.idc;
	var precio = req.query.precio;	
	var date = new Date();
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	Product.find({"_id":idp},function(err, respu) {
		if(respu.vendido){
			mongoose.connection.close();
			res.send(respu)
		}else{
			Product.findOneAndUpdate({"_id":idp},{"comprador":idc,"preciofin":precio,"fecha_sub": date},function(err, resp) {
				Product.find({"_id":idp},function(err, respu) {
					User.populate(respu, {path: "comprador", select: '-qxws', select: '-monedas', select:'-admin'}, function(err, product) {
						if (err) throw err;
						mongoose.connection.close();
						console.log(product);
						res.send(product);
					});
				});
			})
		}
	})
});

router.get('/finsub',(req,res)=>{
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	console.log(req);
	var idp = req.query.idprod;
	var date = new Date();
	Product.findOneAndUpdate({"_id":idp},{"vendido":true,"fecha_sub": date},function(err, resp) {
	});
	Product.find({"_id":idp},function(err, respu) {
		User.find({"_id":respu[0].comprador}, function(err, comprador) {
			var total = parseInt(comprador[0].monedas);
			total -= parseInt(precio);
			User.findOneAndUpdate({"_id":idc},{"monedas":total},function(err, resp) {
			});
		});
		User.find({"_id":respu[0].vendedor}, function(err, vendedor) {
			var total = parseInt(vendedor[0].monedas);
			total += parseInt(precio);
			User.findOneAndUpdate({"_id":idv},{"monedas":total},function(err, resp) {
			});
		});
	});
	Product.find({"_id":idp},function(err, respu) {
		mongoose.connection.close();
		res.send(respu);
	});
});

router.get('/masdinero', (req,res)=>{
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	var id = req.query.id;
	var dinero = req.query.dinero;
	User.find({"_id":id}, function(err, comprador) {
		var total = parseInt(comprador[0].monedas);
		total += parseInt(dinero);
		User.findOneAndUpdate({"_id":id},{"monedas":total},function(err, user) {
		});
		User.find({"_id":id}, function(err, resp) {
			mongoose.connection.close();
			res.send(resp);
		});
	});
})



// todos los productos que no estan vendidos  con los datos del vendedor
router.get('/allproducts', (req,res)=>{
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	Product.find({"vendido":false}, function(err,product) {
		User.populate(product, {path: "vendedor", select: '-qxws', select: '-monedas', select:'-admin'}, function(err, product) {
			mongoose.connection.close();
			res.send(product);
		})
	});
});
// un producto con los datos de su vendedor
router.get('/unproducto',(req,res)=>{
	var id = req.query.id;
	mongoose.connect('mongodb://'+IP.IP+'/subastas');
	Product.find({"_id":id}, function(err, product) {
		User.populate(product, {path: "vendedor", select: '-qxws', select: '-monedas', select:'-admin'}, function(err, product) {
			if(!product[0].comprador){
				mongoose.connection.close();
				res.send(product);
			} else{
				User.populate(product, {path: "comprador", select: '-qxws', select:'-admin'}, function(err, product) {
					mongoose.connection.close();
					res.send(product);
				})
			}
		})
	})
});

/* END GET */

module.exports = router;