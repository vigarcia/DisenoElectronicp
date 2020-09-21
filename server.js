const express = require('express');
const app = express();

var mensaje = 'Hola';
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const mysql = require('mysql');
// Credentials for connecting the database
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vale229810',
    database: 'db3'
});
// Establish connection
database.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to DB');
});
app.set('view engine', 'ejs');

server.on('error', (err) => {
	console.log(`server error:\n${err.stack}`);
	server.close();
});

server.on('message', (msg, rinfo) => {
	console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
	mensaje = msg;
	msg = msg.toString().split(",")
	msg = {latitud: msg[0], longitud: msg[1], fecha:msg[2], hora:msg[3]}
	let sql = 'INSERT INTO Ubicación SET ?';
    let query = database.query(sql, msg, (err, result) => {
        if (err) throw err;
    });
});

server.on('listening', () => {
	const address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(49153);

app.get('/', function (req, res) {
	res.render('index', {
		msg: mensaje,
	});
});

app.use(express.static('public'));

app.get('/ruta', function (req, res) {
	res.json({ msg: mensaje });
});

app.listen('49152', function () {
	console.log('Hola');
});
