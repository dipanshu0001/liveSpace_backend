const express = require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const bp = require("body-parser")
const cors = require("cors");
// const Fileupload = require("express-fileupload")

const app = express();
dotenv.config();
const port = process.env.PORT || 4040;
console.log(process.env.USERNAME)
const link = process.env.STRING_URL.replace("<PASSWORD>", process.env.PASSWORD)

mongoose.connect(link, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(data => console.log("database connected succesfully👍"))
    .catch(err => console.error(err))

app.use(bp.json());
app.use(bp.urlencoded({ encoded: true, urlencoded: true }))
app.use(cors());

app.use("/Listings", require('./Routes/ListingRoutes.js'))
app.use("/Agents", require('./Routes/AgentRoutes.js'))

app.listen(4000, () => {
    console.log("Server running at port 4000");
})

