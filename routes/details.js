const { getProduct, deleteProduct, client} = require('../db')
const app = require('express').Router()
app.use(require('method-override')('_method'))
module.exports = app

app.get('/:id', async(req, res, next) => {
	try {
		const Details = await client.query('SELECT * FROM "Product" WHERE id=$1',[req.params.id]);
		const product = Details.rows[0]
		res.send(`
			<html>
				<head>
					<link rel="stylesheet" href="/assets/style.css">
				</head>
				<body>
					<h1>FSA Product Details</h1>
					<div><a href="/">Back</a></div>
					<div class="product-details">
						<h3>${product.title}</h3>
						<img src="${product.thumbnail}">
						<p><span>Rating:</span> ${product.rating}</p>
						<p><span>Reviews:</span> ${product.reviews}</p>
						<p><span>Price:</span> $${product.price}</p>
						<p><span>Link:</span><a href="${product.url}" target="_blank"> ${product.url}</a></p>
					</div>
					<form method="POST" action="${product.id}?_method=DELETE">
						<button>SOLD</button>
					</form>
				</body>
			</html>
		`)
	}
	catch(ex) {
		next(ex)
	}
})


app.delete('/details/:id', async(req, res, next)=> {
	try {
		await deleteProduct(req.params.id)
		res.redirect('/')
	}
	catch(ex) {
		next(ex)
	} 
})
