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
      default: "empty"
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
