const express=require('express');
const Router=express.Router();
const {AddDetails,SendEmail,GetAgent,AllAgents,AgentListings,AllAgentsAssign,AssignAgent,DeleteAgent}=require('../Controller/AgentsFunctions')


Router.post("/AddDetails",AddDetails)
.post("/SendEmail",SendEmail)
.post("/GetAgent",GetAgent)
.post('/AllAgents',AllAgents)
.post('/AllAgentsAssign',AllAgentsAssign)
.post('/AgentListings',AgentListings)
.post('/AssignAgent',AssignAgent)
.post('/DeleteAgent',DeleteAgent)

module.exports = Router;