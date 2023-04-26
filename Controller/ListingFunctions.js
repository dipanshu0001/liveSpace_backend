const ListingModel = require('../Models/Listing')
const mongoose = require('mongoose');


function AddDetails(req, res) {
    // console.log("caaled")
    const { Description, Name, Status, Type, Price, RentalPeriod, Size,
        Thumbnail, Images, Address, City, Pincode, Latitude, Longitutde, Beds, Bath, Condition, Year_Build, View, uid } = req.body;
    // console.log(req.body);
    // if (!Name || !Status || !Type || !RentalPrice || !RentalPeriod || !Size || !Thumbnail || !Images || !Address || !City || !Pincode || !Latitude || !Long || !Beds || !Bath || !Condition || !Year_Build || !View || !uid) {
    //     return res.status(400).json({ message: "Fill all fields" })
    // }
    // else {
    const new_Listing = new ListingModel({
        Description,
        Name,
        Status,
        Type,
        Price,
        RentalPeriod,
        Size,
        Thumbnail,
        Images,
        Address,
        City,
        Pincode,
        Latitude,
        Longitutde,
        Beds,
        Bath,
        Condition,
        Year_Build,
        View,
        uid
    })
    new_Listing.save()
        .then(() => {
            return res.status(200).json({ message: "Listing added successfully", iserror: 1 });
        })
        .catch((err) => {
            // console.log(err);
            return res.status(500).json({ message: "Failed to add listing", iserror: 2 });
        });
    // } 
    // res.end("helloe world!");

}

const get_limited = async (req, res) => {
    try {
        const {quantity}=req.body
        const data = await ListingModel.find().limit(quantity);
        // console.log(data);
        return res.send(data);
    } catch (err) { return res.json({ message: "internal server Error" }) }
}

const get_particular = async (req, res) => {
    const { id } = req.body;
    // console.log(req.body);
    try {

        const Listing_value = await ListingModel.find({ _id: id });
        if (Listing_value.length > 0) {
            return res.json({ Listing_data: Listing_value });
        }
    } catch (err) {
        return res.json({ message: "no data exists regarding this _id", Listing_data: "" });
    }
}

const SubmitedListing = async (req, res) => {
    const { uid } = req.body;
    // console.log(req.body)
    try {
        const result = await ListingModel.find({ uid: uid })
        res.send(result);
    } catch (e) {
        console.log(e.message)
    }
}

const MarkPending = async (req, res) => {
    try {
        const { _id } = req.body;
        const result = await ListingModel.findById(_id);
        // console.log(result.Sale);
        const updateData={
            Sale:!result.Sale,
            Pending:!result.Pending
        }
        // console.log(updateData)
        const updateresult=await ListingModel.findByIdAndUpdate(_id,updateData,{new:true});
        // console.log(updateresult.Sale,updateresult.Pending)
        res.status(200).json({ message: "Updated Successfully", iserror: 1 })

    } catch (e) {
        res.status(500).json({ message: "Internal Error Occured ", iserror: 3 })
    }
}
const MarkSold = async (req, res) => {
    try {
        const { _id,uid} = req.body;
        // console.log(req.body);
        const result = await ListingModel.findById(_id);
        // console.log(result.Sale);
        const updateData={
            Sale:!result.Sale,
            Pending:!result.Pending
        }
        // console.log(updateData)
        const updatedresult = await ListingModel.findByIdAndUpdate(_id, updateData, { new: true });
        // console.log(updatedresult)
        const updateresult=await ListingModel.find({uid:uid});
        // console.log(updateresult);
        res.status(200).json({ message: "Updated Successfully", iserror: 1,data:updateresult})

    } catch (e) {
        res.status(500).send(e.message)
    }
}

const Deleteid=async(req,res)=>{
    try{
        const {_id,uid}=req.body._id;
        const result=ListingModel.findByIdAndDelete({_id:_id})
        // console.log(result);
        const updateresult=await ListingModel.find({uid:uid});
        res.status(200).json({ message: "Deleted Successfully", iserror: 1,data:updateresult})
    }catch(err){
        res.status(500).json({ message: "internal server error", iserror: 3})
    }
}


const GetAllListing=async (req,res)=>{
    try{
        const result=await ListingModel.find({Agent_uid:{$exists:false}});
        res.send(result);
    }catch(Err){
        res.status(500).json({message:"Internal Erro",iserror:2})
    }
}

const AssignAgent_id=async(req,res)=>{
    try{
        const {_id,Agent_uid}=req.body;
        const result=await ListingModel.findByIdandUpdate({_id:_id},{Agent_uid:Agent_uid},{new:true});
        res.status(200).json({message:"Agent Added",iserror:1})
    }catch(err){
        res.status(500).json({message:"Internal Server Error",iserror:3})
    }
}
module.exports = { AddDetails, get_limited, get_particular, SubmitedListing, MarkSold ,MarkPending,Deleteid,AssignAgent_id,GetAllListing}