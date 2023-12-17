const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Device, validateDevice} = require('../models/device');
const RNCryptor = require("jscrypto");

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).send('Invalid email or password.');

//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword) return res.status(400).send('Invalid email or password.');

//   const token = user.generateAuthToken();
//   res.send(token);
// });


router.post("/", async(req,res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send({error: error.details[0].message});
  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send({error: "Invalid email or password."});
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken()
  return res.send(token);
});

function validate(reqBody){
  const schema = Joi.object({
    email: Joi.string()
      .min(2)
      .max(50)
      .email()
      .required()
    ,
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  });
  return schema.validate(reqBody);
}

// router.post("/device",async (req, res) => {
//   const {error} = validateDevice(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   let device = await Device.findOne({ serial : req.body.serial});
//   if (!device) return res.status(400).send("Invalid Device ");
//   let n_id_client = "";
//   if(device.id =="empty"){
//     const salt = await bcrypt.genSalt(10);
//     n_id_client = await bcrypt.hash(device.id,salt);
//     device.id = n_id_client ;
//     await device.save();

//   }else n_id_client = req.body.n_id_client;
//   const  validClienId = await bcrypt.compare(n_id_client,device.id);
//   if(!validClienId) return res.status(400).send("Invalue Serial number");
//   const token = device.generateDeviceAuthTonken();
//   res.send(token);
// });

router.post("/catchme", async (req, res) => {
  try {
    console.log(req.body.data);
    var data = RNCryptor.Decrypt(req.body.data, "ThanhThanh123").toString();
    console.log("datadecrypt : %@",data);
    const dataArr = data.split("||");
    console.log("dataArr : %@",dataArr);
    if ( dataArr.length !== 2 )
    return res.status(400).send({data: "Device not support"});
    const serial = dataArr[0];
    const clientId = dataArr[1];
    const device = await Device.findOne({imei : info.imei});
    if ( device.id == "empty"){
      device.id = clientId ;
      await device.save();
    }
    // check expired 
    console.log(Date.now());
    if ( device.expiredDate < Date.now()){
      return res.status(400).send({data : " Device is Expired"});
    }
    const deviceData = RNCryptor.Encrypt(
      `${device.imei}||${device.id}|| ${device.expiredDate}`,
      "Obj_getClass(NSProtocol)"
    );
    return res.send({
        id : deviceData,
        serial : device.imei,
        expiredDate : device.expiredDate,
    });
  }catch (error){
      return res.status(400).send({data : "Device not supporte "});
  }

});

module.exports = router; 
