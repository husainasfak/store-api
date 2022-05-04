require('dotenv').config();
require('express-async-errors')

const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const productRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');

const errorMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.use('/api/v1/products',productRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);
let port = process.env.PORT || 5000;

const start = (async() =>{
     try{
          await connectDB(process.env.MONGO_URI);
          app.listen(port, console.log(`listen on ${port}`))
     }catch(error){
          console.log(error)
     } 
})();