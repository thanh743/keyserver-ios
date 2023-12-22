const Joi = require('joi');
const mongoose = require('mongoose');
const { User } = require('./user');


const deviceSchema = new mongoose.Schema({
    id: {
      type: 'String',
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 70,
    },
    name: {
        type: 'String',
        required: true,
        minlength: 5,
        maxlength: 70
    },
    createdDate: {
        type: Number,
        default: Date.now()
    },
    info: {
        serial : {
            type: 'String',
            minlength: 5, 
            maxlength: 70
        },
        imei: {
            type: 'String',
            minlength: 5, 
            maxlength: 70
        }
    },
    expiredDate: {
        type: Number,
        default: Date.now()
    },
    activatedDate: {
        type: Number,
        required: true,
        default: Date.now(),
    },
    isExpired:{
        type: Boolean,
        required: true,
        default: true ,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
async function validateDevice(device) {
    
    const schema = Joi.object({
        id: Joi.string().min(5).max(50).required(),
        name: Joi.string().min(5).max(50).required(),
    });
    
    return schema.validate(device);
}
exports.Device = mongoose.model('Device', deviceSchema);
exports.validateDevice = validateDevice;


// async function createDevice(req, res) {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(400).send("User not found");

//     const { error } = validateDevice(req.body);

//     if (error) return res.status(400).send(error.details[0].message);



//     try {
//         const data = req.body.data;
//         let imei = req.body.imei;
//         let serial = req.body.serial;
//         if (data){
//              const dataString = RNCryptor.Decrypt(data,"ThanhThanh@@123").toString();
//              imei = dataString.split("||")[0];
//              serial = dataString.split("||")[1];
//         }
//         const body = _.omit(req.body,["data"]);
//         console.log(req.body);
//         const device = new Device({...body,user: user,info: {
//             imei: imei, serial: serial
//         } });
//       // Mongoose Schema object

//         await device.save();
//         console.log(device);

//         res.send(_.omit(device.toObject(),['user'])); // device.toObject() => javascript Object // 
//     } catch (error) {
//         res.status(500).send(error.errors ? error.errors : error);
//     }
// }