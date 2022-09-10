const express= require("express");
const SibApiV3=require("sib-api-v3-sdk");

const app=express();

require("dotenv").config();

app.post("/sendmail",(req,res,next)=>{
    const email=req.query.email;
    console.log(email)
    let apikey=process.env.SIB_API_KEY

    //AUTH SETUP
    let defaultClient=SibApiV3.ApiClient.instance;
    let apiKey=defaultClient.authentication['api-key'];
    apiKey.apiKey=apiKey;

    //CREATE CONTACT
    let apiInstance=new SibApiV3.ContactsApi();
    let createContact=new SibApiV3.CreateContact();
    createContact.email=email;
    createContact.listIds=[2];

    apiInstance.createContact(createContact).then((data)=>{
        res.status(200).send("Success");

    },function(err){
        res.status(500).send("Failure");
    })
})
app.use((req,res,next)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(3000,()=>{
    console.log("Server is listening to port 3000")
})