const { Client }= require('pg')
const client = new Client (process.env.DATABASE_URL || 'postgres://localhost/amazon')
const express = require('express')

const app = express()
app.use(express.urlencoded({extended:false}))

const getProduct = async() =>{
	return (await client.query('SELECT * FROM "Product";')).rows;
}

const deleteProduct = async(id) => {
	return await client.query('DELETE FROM "Product" WHERE id=$1', [id])
}

const amazon = async() =>{
	const SQL = `
		DROP TABLE IF EXISTS "Product";
		CREATE TABLE "Product"(
			id SERIAL PRIMARY KEY,
			title VARCHAR(100) NOT NULL,
			url  VARCHAR(255),
			thumbnail VARCHAR(255),
			price DECIMAL(10,2),
			rating DECIMAL(2,1),
			reviews INT
		);
		INSERT INTO "Product"(title, url, thumbnail, price, rating, reviews) VALUES('Stereo Headphones', 'https://www.amazon.com/dp/B08CXQZFW7', 'https://m.media-amazon.com/images/I/51kLgv1Hy6L._AC_UY218_.jpg', '39.97', '3.8', '255');
		INSERT INTO "Product"(title, url, thumbnail, price, rating, reviews) VALUES('Apple iPhone 7 32GB', 'https://www.amazon.com/dp/B08G8KX1GZ', 'https://m.media-amazon.com/images/I/51cRE43zKwL._AC_UY218_.jpg', '39.98', '4.2', '100');
		INSERT INTO "Product"(title, url, thumbnail, price, rating, reviews) VALUES('Mini Bluetooth', 'https://www.amazon.com/dp/B07YXZTLLT', 'https://m.media-amazon.com/images/I/815Ft7CdvPL._AC_UY218_.jpg', '21.99', '5', '7');
		INSERT INTO "Product"(title, url, thumbnail, price, rating, reviews) VALUES('Headphone Adapter', 'https://www.amazon.com/dp/B07Z1YH1WD', 'https://m.media-amazon.com/images/I/51yjoG3P24L._AC_UY218_.jpg', '7.99', '5', '10');
		INSERT INTO "Product"(title, url, thumbnail, price, rating, reviews) VALUES('Apple iPhone 8', 'https://www.amazon.com/dp/B07HKQ61NV', 'https://m.media-amazon.com/images/I/71aOr1CuM1L._AC_UY218_.jpg', '239.99', '4.3', '489');
	`;
	await client.query(SQL)
}



module.exports = {
	getProduct,
	deleteProduct,
	amazon,
	client
}