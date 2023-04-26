const express = require('express');
const Router=express.Router();
const {ScheduleTour,GetAllTour,GetToursUser,AddAgentTour,DeleteTourid,CancelTour}=require('../Controller/TourFunctions')


Router  .post("/ScheduleTour",ScheduleTour)
        .post("/GetAllTour",GetAllTour)
        .post("/GetToursUser",GetToursUser)
        .post('/AddAgentTour',AddAgentTour)
        .post('/DeleteTourid',DeleteTourid)
        .post('/CancelTour',CancelTour);



module.exports =Router