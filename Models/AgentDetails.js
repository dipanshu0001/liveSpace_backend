const mongoose = require('mongoose');


const AgentImageSchema = new mongoose.Schema({

    uid: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Gmail: {
        type: String,
        required: true
    },
    Imageurl: {
        type: String,
        required: true
    },
   Description: {
        type: String,
        default:"Hi there! I'm your friendly neighborhood real estate agent, the expert in all things property. Whether you're looking to buy, sell, or rent, I've got the insider knowledge and sharp negotiation skills to make your real estate dreams come true. From finding your dream home to maximizing your investment, I'm here to make your real estate journey a smooth"
    },
})

const AgentImageModel = new mongoose.model('agentimagedb', AgentImageSchema);

AgentImageModel.updateMany({}, { Description: '' }, { multi: true }, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Updated ${result.nModified} documents`);
    }
});
module.exports = AgentImageModel;