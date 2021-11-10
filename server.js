const {client, getProduct, deleteProduct, amazon} = require('./db')
const express = require('express')
const path = require('path')
const app = express()


app.use('/assets', express.static(path.join(__dirname, '/assets')))
app.use(require('method-override')('_method'))

app.get('/', async(req, res, next) => {
	try{
		const product = await getProduct()
		res.send(`
			<html>
				<head>
					<link rel="stylesheet" href="/assets/style.css">
				</head>
				<body>
					<h1>FSA Products</h1>
					<ul>
					${product.map(product =>
					`
						<a href="/details/${product.id}">
						<li>
							<span>${product.title}</span>
							<img src="${product.thumbnail}">
						</li>
						</a>
					`).join(' ')
					}
					<ul>
					<form></form>
				</body>
			</html>
		`)
	}
	catch(ex) {
		next(ex)
	}
})

app.use('/details', require('./routes/details'))

const init = async() => {
	try
	{
		await client.connect()
		await amazon()
		await getProduct()
		await deleteProduct()
		const PORT = process.env.PORT || 3000
		app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))
	}
	catch(ex)
	{
		console.log(ex)
	}
}

init();