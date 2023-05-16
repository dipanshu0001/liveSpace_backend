const express = require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const bp = require("body-parser")
const cors = require("cors");
const AgentImageModel = require('./Models/AgentDetails')


const app = express();
dotenv.config();
const port = process.env.PORT || 4040;
// console.log(process.env.USERNAME)
const link = process.env.STRING_URL.replace("<PASSWORD>", process.env.PASSWORD)

mongoose.connect(link, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(data => console.log("database connected succesfully👍"))
    .catch(err => console.error(err))

    const updateAgentImagesMiddleware = (req, res, next) => {
        console.log("hello")
        AgentImageModel.updateMany({}, { Description: '' }, { multi: true }, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Updated ${result.nModified} documents`);
          }
        });
        next();
      };
      
app.use(bp.json());
app.use(bp.urlencoded({ encoded: true, urlencoded: true }))
app.use(cors({
  origin: 'https://live-space.vercel.app/'
}));
// app.use(updateAgentImagesMiddleware);
// console.log(process.env.GMAIL)
// console.log(process.env.GMAIL_PASSWORD)
app.use("/Listings", require('./Routes/ListingRoutes.js'))
app.use("/Agents", require('./Routes/AgentRoutes.js'))
app.use("/Tours", require('./Routes/ToursRoutes.js'))
app.use("/Categories", require('./Routes/CategoriesRoutes.js'))


app.listen(4000, () => {
    console.log("Server running at port 4000");
})

