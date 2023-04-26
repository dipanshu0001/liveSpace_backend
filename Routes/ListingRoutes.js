const express = require('express');
const Router = express.Router();
const { AddDetails,get_limited,get_particular,SubmitedListing,MarkSold,MarkPending,Deleteid,GetAllListing,AssignAgent_id } = require('../Controller/ListingFunctions.js');


Router.post("/AddDetails", AddDetails)
    .post("/LimitedDisplay", get_limited)
    .post("/GetParticular",get_particular)
    .post("/SubmitedListing",SubmitedListing)
    .post("/MarkSold",MarkSold)
    .post("/MarkPending",MarkPending)
    .post("/DeleteId",Deleteid)
    .post("/GetAllListing",GetAllListing)
    .post("/AssignAgent_id",AssignAgent_id);
    



module.exports = Router
