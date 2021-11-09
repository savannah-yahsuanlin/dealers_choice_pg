const express = require('express')
const { Client }= require('pg')
const client = new Client (process.env.DATABASE_URL || 'postgres://localhost/amazon')

const app = express()


app.get('/', async(req, res, next) => {
	try{

	}
	catch(ex) {
		next(ex)
	}
})

app.use(express.urlencoded({extended: false}))

const amazon = async() =>{
	const SQL = `
		DROP TABLE IF EXISTS "Product";
		CREATE TABLE "Product"(
			id SERIAL PRIMARY KEY,
			title VARCHAR(20) NOT NULL,
			url  VARCHAR(255),
			thumbnail VARCHAR(255),
			price DECIMAL(10,2)
		);
		INSERT INTO "Product"(title, url, thumbnail, price) VALUES('Stereo Headphones', 'https://www.amazon.com/dp/B08CXQZFW7', 'https://m.media-amazon.com/images/I/51kLgv1Hy6L._AC_UY218_.jpg', '39.97');
		INSERT INTO "Product"(title, url, thumbnail, price) VALUES('CVC8.0 Headphones', 'https://www.amazon.com/dp/B08G8KX1GZ', 'https://m.media-amazon.com/images/I/61HUlvqt2IL._AC_UY218_.jpg', '39.98');
		INSERT INTO "Product"(title, url, thumbnail, price) VALUES('Mini Bluetooth', 'https://www.amazon.com/dp/B07YXZTLLT', 'https://m.media-amazon.com/images/I/815Ft7CdvPL._AC_UY218_.jpg', '21.99');
		INSERT INTO "Product"(title, url, thumbnail, price) VALUES('Headphone Adapter', 'https://www.amazon.com/dp/B07Z1YH1WD', 'https://m.media-amazon.com/images/I/51yjoG3P24L._AC_UY218_.jpg', '7.99');
	`;
	await client.query(SQL)
}


const init = async() => {
	try
	{
		await client.connect()
		await amazon()
		console.log('database connect')
		const PORT = process.env.PORT || 3000
		app.use('port', ()=> console.log(`listening on port ${port}`))
	}
	catch(ex)
	{
		console.log(ex)
	}
}

init()