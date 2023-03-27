const express=require('express');
const Router=express.Router();
const {AddImage}=require('../Controller/AgentsFunctions')


Router.post("/Addimage",AddImage);

module.exports = Router;