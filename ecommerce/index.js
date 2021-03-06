const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const boom = require("@hapi/boom");
const cors = require("cors");

const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const apiAuthRouter = require('./routes/api/auth');
const { logErrors , 
        wrapErrors,
        clientErrorHandler , 
        errorHandler
      } = require('./utils/middlewares/error-handler');

const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi");
//app
const app = express();

//middlewares
app.use(cors())
app.use(bodyParser.json());

//static files
app.use('/static' , express.static(path.join(__dirname,"public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine" , "pug");

// routes
app.use('/products', productsRouter);
app.use('/api/products' , productsApiRouter);
app.use('/api/auth' , apiAuthRouter);

//redirect
app.get('/', (req,res) => {
    res.redirect('/products');
})
app.use(function(req, res, next) {
    if (isRequestAjaxOrApi(req)) {
      const {
        output: { statusCode, payload }
      } = boom.notFound();
  
      res.status(statusCode).json(payload);
    }
  
    res.status(404).render("404");
  });

//error handler
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
//server
const server = app.listen(8000, () => {
    console.log(`Listening http://localhost:${server.address().port}`);
})