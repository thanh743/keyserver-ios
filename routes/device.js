const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/devices');
const auth = require("../middleware/auth")

// Route: Get all devices
router.get('/', auth, deviceController.getAllDevices);

// Route: Get a device by ID
router.get('/:serial', auth, deviceController.getDeviceBySerial);

// Route: Create a new device
router.post('/', auth,deviceController.createDevice);

// Route: Update a device by ID
router.put('/:id',auth, deviceController.updateDevice);

// Route: Delete a device by ID
router.delete('/:id',auth, deviceController.deleteDevice);

module.exports = router;
