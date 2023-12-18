const { Device, validateDevice } = require('../models/device');
const { User} = require('../models/user');
const _ = require("lodash");
const RNCryptor = require("jscrypto");
// Example: Get all devices
async function getAllDevices(req, res) {
    try {
        const user = await User.findOne({email: req.user.email});
        const devices = await Device.find({user: user});
        res.send(devices);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
async function getDeviceBySerial(req, res) {
    const serial = req.params.serial;
    try {
        const user = await User.findOne({email: req.user.email});
        const device = await Device.findOne({"info.serial": serial,"user": user});

        if (!device) {
            return res.status(404).send('Device not found');
        }

        res.send(device);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


async function deleteDevice(req, res) {
    const deviceId = req.params.id;
    try {
        const device = await Device.findByIdAndDelete(deviceId);
        if (!device) {
            return res.status(404).send('Device not found');
        }
        res.send(device);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
async function updateDevice(req, res) {
    const deviceId = req.params.id;

    // Validate the request body
    const { error } = validateDevice(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
      
        const device = await Device.findByIdAndUpdate(
            deviceId,
            {
                id: req.body.id,
                name: req.body.name
              
            },
            { new: true } // Return the updated device
        );

        if (!device) {
            return res.status(404).send('Device not found');
        }

        res.send(device);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function createDevice(req, res) {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("User not found");
    if (!req.body.data) return res.status(400).send("Invalid data request");

    const { error } = validateDevice(req.body);

    if (error) return res.status(400).send(error.details[0].message);



    try {
        const data = req.body.data;

        const dataString = RNCryptor.Decrypt(data,"ThanhThanh@@123").toString();
        const imei = dataString.split("||")[1];
        const serial = dataString.split("||")[0];
        const body = _.omit(req.body,["data"]);
        const device = new Device({...body,user: user,info: {
            imei: imei, serial: serial
        } }); // Mongoose Schema object


        await device.save();
        res.send(_.omit(device.toObject(),['user'])); // device.toObject() => javascript Object // 
    } catch (error) {
        res.status(500).send(error.errors ? error.errors : error);
    }
}



module.exports = { getAllDevices, createDevice, deleteDevice, updateDevice,getDeviceBySerial };


// Dependencies Injection