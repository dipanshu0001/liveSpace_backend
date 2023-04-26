const mongoose=require("mongoose")
const {Schema,model}=mongoose;

const TourSchema=new Schema({
    Name:{
        type:String,
    },
    Email:{
        type:String
    },
    Phone:{
        type:String
    },
    Comment:{
        type:String
    },
    S_Date:{
        type:String,
        required:true
    },
    Done:{
        type:Boolean,
        default:false
    },
    Listing_id:{
        type:String,
    },
    User_uid:{
        type:String
    },
    Agent_uid:{
        type:String
    },
    isCancel:{
        type:Boolean,
        default:false
    }
})

const TourModel=new model('tourModel',TourSchema);

module.exports = TourModel;