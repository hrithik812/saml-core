const express = require('express');
const router = express.Router();
const { userclient, clientinfos } = require('../models'); // Import your Sequelize models

router.post('/saveInfo',  async(req, res) => {
    const { name,address,email,occupation,mobileNo } = req.body;  // Assuming 'data' is the info you want to save
    
    // Logic to handle the request and save data
    if (!name || !mobileNo) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Simulate saving to database
    // For example, save to the `userclient` table in your database
    try {
        // First, create the client info
        const client = await clientinfos.create({
            name,
            address,
            email,
            occupation,
            mobileNo,
        });
   console.log("Client info----",client);
   
        // Then, create the UserClient record
        const userClient = await userclient.create({
            userId,      // Assuming userId is from the request body
            clientId: client.id, // Use the ID of the newly created client
        });

        // Return success response
        res.status(201).json({ 
            message: 'Info saved successfully', 
            data: { userClient, client } 
        });
    } catch (error) {
        console.error('Error saving info:', error);
        res.status(500).json({ message: 'Error saving info', error: error.message });
    }
});
module.exports = router;