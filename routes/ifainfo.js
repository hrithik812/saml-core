const express = require('express');
const router = express.Router();
const { userclient, clientinfos,userteamleaders,users } = require('../models'); // Import your Sequelize models

router.post('/saveInfo',  async(req, res) => {
    const { name,address,email,occupation,mobileNo,userId } = req.body;  // Assuming 'data' is the info you want to save
        
    // Logic to handle the request and save data
    if (!name || !mobileNo) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // First, create the client info
        const client = await clientinfos.create({
            name,
            address,
            email,
            occupation,
            mobileno:mobileNo,
        });

        
   
        // Then, create the UserClient record
        const userClient = await userclient.create({
            userid:userId,      // Assuming userId is from the request body
            clientid: client?.id, // Use the ID of the newly created client
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
// router.get('/clientInfo/:userId', async (req, res) => {
//     const { userId } = req.params;
    
    
//     try {
//         // Query the userclient table for the given userId
//         const userClients = await userclient.findAll({
//             where: { userid: userId },
//             include: [
//                 {
//                     model: clientinfos, // Assuming you have defined an association between userclient and clientinfos
//                 },
//             ],
//         });


//         // Check if any records are found
//         if (!userClients.length) {
//             return res.status(404).json({ message: 'No client info found for this user.' });
//         }
  
//         res.status(200).json({
//             message: 'Client info retrieved successfully',
//             data:userClients
//         });
//     } catch (error) {
//         console.error('Error retrieving client info:', error);
//         res.status(500).json({ message: 'Error retrieving client info', error: error.message });
//     }
// });
router.get('/clientInfo/:teamLeaderId', async (req, res) => {
    const { teamLeaderId } = req.params; // Get the teamLeaderId from the request params
    
    try {
        // Step 1: Fetch all users associated with the given teamLeaderId
        const teamLeaderUsers = await userteamleaders.findAll({
            where: { teamLeaderId },
            include: [
                {
                    model: users,  // Assuming users table contains the information of users
                    attributes: ['id', 'username', 'email'], // Specify the attributes you want to fetch for the users
                }
            ]
        });

        // If no users are associated with the given teamLeaderId
        if (!teamLeaderUsers.length) {
            return res.status(404).json({ message: 'No users found for this team leader.' });
        }

        // Step 2: Fetch all the clients associated with those users
        const userIds = teamLeaderUsers.map(entry => entry.userId); // Get the userIds from the associated users
        
        const userClients = await userclient.findAll({
            where: { userid: userIds },  // Find all clients for these users
            include: [
                {
                    model: clientinfos,  // Assuming clientinfos table contains client info
                    attributes: ['id', 'name', 'address', 'mobileno', 'occupation', 'email'], // Specify the attributes you want to fetch for clients
                },
            ],
        });

        // If no clients are found for the users
        if (!userClients.length) {
            return res.status(404).json({ message: 'No client info found for the associated users.' });
        }

        // Step 3: Group the client info by userId
        const groupedClients = {};

        userClients.forEach(userClient => {
            const userId = userClient.userid;
            const clientInfo = userClient.clientinfo; // Get client info from the userclient relation

            // Initialize the userId key if it doesn't exist
            if (!groupedClients[userId]) {
                groupedClients[userId] = {
                    userId: userId,
                    username: teamLeaderUsers.find(user => user.userId === userId).user.username,
                    clientInfo: [],
                };
            }

            // Add the client info to the userId's clientInfo array
            groupedClients[userId].clientInfo.push(clientInfo);
        });

        // Convert the grouped data to an array
        const result = Object.values(groupedClients);

        // Step 4: Return the data
        res.status(200).json({
            message: 'Client info retrieved successfully',
            data: result,
        });

    } catch (error) {
        console.error('Error retrieving client info:', error);
        res.status(500).json({ message: 'Error retrieving client info', error: error.message });
    }
});


module.exports = router;