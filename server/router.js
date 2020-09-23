//mensaje dgram 
let database = require('../server')

const express = require('express');
let app = express();
app.set('view engine', 'ejs');
module.exports = app
app.use(express.static('public'));

//Rutas
app.get('/', function (req, res) {
	res.render('index', {
		msg: 'Hola',
	});
});



app.get('/data', function (req, res) {
    let sql = "SELECT * FROM localitation ORDER BY id DESC limit 1"
    database.query(sql,(err,result)=>{
        console.log(`EL resultado es ${result[0]} `);
        res.json(result[0])
    })
	// res.json({ msg: msg });
});

app.listen('49152', function () {
	console.log(`Example app listening at http://localhost:49152`)
});