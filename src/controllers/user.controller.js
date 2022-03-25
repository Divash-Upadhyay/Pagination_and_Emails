const express=require("express");

const transporter= require("../configs/mail")

const User = require("../models/user.model");


const router= express.Router();


  
router.get("/", async (req, res) => {
    try {
      const users = await User.find().lean().exec();
      return res.status(200).send(users);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });


  router.post("/",async (req,res) =>{
    try{
     const user = await User.create(req.body);

     transporter.sendMail({
      from: '"Amazon admin " <admin@amazon.com>', // sender address
      to: user.userEmail, // list of receivers
      subject: " Welcome✔ to org system ", // Subject line
      text: "{user.first_name} {user.last_name} , Please confirm your email address", // plain text body
      html: "<b>{user.first_name} {user.last_name} , Please confirm your email address</b>", // html body
    });

    return res.status(201).send({ message : "Mail sent successfully"})
    }
    catch(err){
      return res.status(500).send({message : err.message});
    }
    
  })

  module.exports = router;       