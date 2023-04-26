const ListingModel = require('../Models/Listing')



const GetData = async (req, res) => {
    // console.log(req.query);
    try {
        const Type = req.query.Type !== "" ? req.query.Type.split(',') : null;
        const minPrice = req.query.minPrice !== "" ? parseFloat(req.query.minPrice) : null;
        const maxPrice = req.query.maxPrice !== "" ? parseFloat(req.query.maxPrice)+1: null;
        const RentalPeriod = req.query.RentalPeriod !== "Both" ? req.query.RentalPeriod : null;
        let sortParam = req.query.sort || 'Price'; // Default to sorting by createdAt field
        let sortOrder = req.query.order === 'desc' ? -1 : 1; // Default to ascending order
        let query = {};
        let sortObj = {};
        sortObj[sortParam] = sortOrder;
        // console.log(req.query)
        // console.log(Type,minPrice,maxPrice);
        // console.log(minPrice!==null && maxPrice!==null);
        if (minPrice !== null && maxPrice !== null) {
            query.Price = { $gte: minPrice, $lt: maxPrice }
        } if (Type) {
            query.Type = { $in: Type }
        }if(RentalPeriod){
            query.RentalPeriod ={$in: RentalPeriod}
        }
        // console.log(query);
        const result = await ListingModel.find(query)
        // console.log(result);
        res.send(result);

    } catch (err) {
        res.status(500).send({error:err.message,ierror:3});
    }
}
module.exports = { GetData }

