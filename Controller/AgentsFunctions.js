const AgentImageModel = require("../Models/AgentDetails.js");
const nodemailer = require("nodemailer");
const ListingModel = require('../Models/Listing');
const { reset } = require("nodemon");



const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
        user: process.env.GMAIL,
        // user:'livespace2856@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    },
    secure: true
});

const AddDetails = async (req, res) => {
    const { uid, Imageurl, Name, Gmail } = req.body;
    // console.log(req.body)
    if (!uid || !Imageurl || !Name || !Gmail) {
        return res.json({ message: "fill all Fields", iserror: 3 })
    }
    const new_img = new AgentImageModel({
        uid,
        Imageurl,
        Name,
        Gmail
    });

    try {
        const data = await AgentImageModel.findOneAndUpdate({ uid }, new_img, { new: true, upsert: true })
        if (data) return res.json({ message: "updated succesfully", iserror: 1 });
    } catch (err) { console.log(err) }
}

const SendEmail = (req, res) => {
    const { user_email, agent_email, mobile, message, agent_name } = req.body;
    if (!user_email || !agent_email || !mobile || !message) return res.json({ message: "Fill all Fileds", iserror: 2 })
    const mailData = {
        from: `${user_email}`,  // sender address
        to: `${agent_email}`,   // list of receivers
        subject: 'Customer Message', //
        text: `
         Hi ${agent_name},

        A customer just sent the following message with their phone number:
        
        ${message}
        
      
          Their phone number is: ${mobile}
        Please let me know if you need any additional information to properly respond to this message.
        `
    };
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            return res.status(500).json({ message: "internal server error please try again", iserror: 3 })
        }
        return res.json({ message: "Message successfully sent", iserror: 1 })
    })



}

const GetAgent = async (req, res) => {
    const { uid } = req.body;
    // console.log(uid)
    if (!uid) {
        return res.json({ message: "Agent_id is empty" })
    }

    try {

        let agent = await AgentImageModel.findOne({ uid: uid });
        // console.log(agent)  
        if (agent) {
            return res.send(agent);
        }
        else res.status(400).send("no Listing realted to this agent")

    } catch (e) { res.send(e.message) }
}

const AllAgents = async (req, res) => {
    try {
        const result = await AgentImageModel.find();
        res.send(result);
    } catch (e) {
        res.status(500).send({ error: e.message, ierror: 3 });
    }
}

const AgentListings = async (req, res) => {
    try {
        const { uid } = req.body;
        // console.log(req.body)

        const result = await ListingModel.find({ Agent_uid: uid });
        // console.log(result.length)
        res.send(result);

    } catch (e) {
        res.send({ message: e.message, ierror: 1 })
    }
}
const AllAgentAssign_helper=async()=>{
    try {
        const result = await AgentImageModel.find();
        let agents = [];
        await Promise.all(result.map(async (ele) => {
            // console.log(ele)
            const count = await ListingModel.countDocuments({ Agent_uid: ele.uid })
            const obj = {
                ...ele._doc,
                Assigned_list: count
                //  console.log(count)
            }
            agents.push(obj)
            return obj
        }))
        agents.sort((a, b) => b.Assigned_list - a.Assigned_list);
        // res.send(agents);
        return agents;
    } catch (e) {
        // res.status(500).send({ error: e.message, ierror: 3 });
        console.log(e.message)
    }

}
const AllAgentsAssign = async (req, res) => {
    try {
        const agents=await AllAgentAssign_helper();
        res.send(agents);
    } catch (e) {
        res.status(500).send({ error: e.message, ierror: 3 });
    }
}
const AssignAgent=async(req,res)=>{
    try{
        const {_id,uid}=req.body;
        // console.log(req.body)
        const updateResult=await ListingModel.findByIdAndUpdate(_id,{Agent_uid:uid},{new:true});
        const agents=await AllAgentAssign_helper();
        res.status(200).send({message:"Agent Assinged Successfully",iserror:1,agents})
    }catch(e){
        res.status(500).send({message:"Internal Server error Occured",iserror:3})
    }
}
const DeleteAgent=async(req,res)=>{
    try{
        const {uid}=req.body;
        const listing_id=await ListingModel.updateMany({Agent_uid:uid},{$unset:{Agent_uid:1}});
        const result=await AgentImageModel.deleteOne({uid:uid});
        const new_result=await AgentImageModel.find();
        res.status(200).send({message:"Agent removed successfully",iserror:1,new_result})
    }catch(err){
        res.send({message:"Internal Server Error",iserror:3});
    }
}
module.exports = {
    AddDetails,
    SendEmail,
    GetAgent,
    AllAgents,
    AgentListings,
    AllAgentsAssign,
    AssignAgent,
    DeleteAgent
}