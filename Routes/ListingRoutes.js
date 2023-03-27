const express = require('express');
const Router = express.Router();
const { AddDetails,get_limited } = require('../Controller/ListingFunctions.js');


Router.post("/AddDetails", AddDetails)
    .get("/LimitedDisplay", get_limited);


module.exports = Router
