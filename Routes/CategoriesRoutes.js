const express=require('express');
const Route =express.Router();
const {GetData}=require('../Controller/Categories')
Route.get('/FilteredData',GetData);

module.exports=Route;
