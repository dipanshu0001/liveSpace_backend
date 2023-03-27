const mongoose = require('mongoose');
const {v4:uuidv4}=require('uuid');    



const ListingSchema=new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
      },
    Description:{
        type:String,
        // required:true
    },
    Name:{
        type:String,
        // required:true
    },
    Status:{
        type:String,
        // required:true
    },
    Type:{
        type:String,
        // required:true
    },
    Price:{
        type:Number,
        // required:true
    },
    RentalPeriod:{
        type:String,
        // required:true
    },
    Size:{
        type:String,
        // required:true
    },
    Thumbnail:{
        type:String,
        // required:true
    },
    Images:{
        type:[String],
        // required:true,
        default:[],
        minlength:3
    },
    Address:{
        type:String,
        // required:true
    },
    City:{
        type:String,
        // required:true
    },
    Pincode:{
        type:Number,
        // required:true
    },
    State:{
        type:"String"
    },
    Latitude:{
        type:Number,
        // required:true
    },
    Longitutde:{
        type:Number,
        // required:true
    },
    Beds:{
        type:String,
        // required:true
    },
    Bath:{
        type:String,
        // required:true
    },
    Condition:{
        type:String,
        // required:true
    },
    Year_Build:{
        type:String,
        // required:true
    },
    View:{
        type:String,
        // required:true
    },
    uid:{
        type:String,
        // required:true
    },
    Agent_uid:{
        type:String,
    }
})

const ListingModel=new mongoose.model('Listing',ListingSchema);

module.exports=ListingModel;