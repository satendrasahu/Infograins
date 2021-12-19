const express = require('express');
const dotenv = require('dotenv')
const moment = require("moment")
dotenv.config()
require("./Db/Conn")
const AuthRouter = require('./Routers/AuthRouter')
const PostRoutes = require('./Routers/PostRoutes')
const cors = require('cors');
const { json } = require('express');
const app = express();
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use('/api/auth', AuthRouter)
app.use('/api/post', PostRoutes)

console.log(moment().format('MM-DD-YYYY, hh:mm:ss a'))
app.listen(port, () => {
    console.log(`connection is successfull at port ${port}`);
})