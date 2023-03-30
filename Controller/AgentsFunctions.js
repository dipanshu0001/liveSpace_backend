const AgentImageModel = require("../Models/AgentImageModel");



const AddImage = (req, res) => {
    const { uid, imageurl } = req.body;
    if (!uid || !imageurl) {
        return res.json({ message:"fill all Fields" ,iserror:3})
    }
    const new_img = new AgentImageModel({
        uid,
        imageurl
    });


    AgentImageModel.findOneandUpdate({ uid }, new_img, { new: true, upsert: true })
        .then(user => {
            return res.json({ message: "Registred Sucessfully", iserror: 1 })
        })
        .catch(err => {
            return res.json({ message: "Internal server errorr plaease registered after some time", iserror: 3 })
        })
}
module.exports ={
    AddImage    
}