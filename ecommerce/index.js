const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

const productsRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products');

app.use('/static' , express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine" , "pug");

app.use('/products', productsRouter);
app.use('/api/products' , productsApiRouter);
const server = app.listen(8000, () => {
    console.log(`Listening http://localhost:${server.address().port}`);
})