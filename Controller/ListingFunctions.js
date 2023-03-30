const ListingModel = require('../Models/Listing')


function AddDetails(req, res) {
    // console.log("caaled")
    const { Description, Name, Status, Type, Price, RentalPeriod, Space,
        Thumbnail, Images, Address, City, Pincode, Latitude, Longitutde, Beds, Bath, Condition, Year_Build, View, uid } = req.body;
        console.log(req.body);
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
        Space,
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
            return res.status(200).json({ message: "Listing added successfully" });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: "Failed to add listing" });
        });
    // } 
    // res.end("helloe world!");

}

const get_limited= async (req,res)=>{
    try{
    const data= await ListingModel.find().limit(5);
    // console.log(data);
    return res.send(data);
    }catch(err){return res.json({ message:"internal server Error"})}
}

module.exports = { AddDetails,get_limited }