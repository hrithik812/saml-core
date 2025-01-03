const express = require('express');
const jwt = require('jsonwebtoken');
const { users,features,roles } = require('../models');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Import bcrypt

const SECRET_KEY = '123456';
const getUserFeatures = async (username) => {
  try {
    const user = await users.findOne({
      where: { username },
      include: [
        {
          model: roles,
          through: { attributes: [] }, // Exclude intermediate table attributes
          include: [
            {
              model: features,
              through: { attributes: [] }, // Exclude intermediate table attributes
            },
          ],
        },
      ],
    });
  
    if (!user) {
      return { message: 'User not found', features: [] };
    }

    // Transform the response to remove the outer "feature" object
    const transformedResponse = {
      message: "Login successful",
      token: user.token, // Replace with actual token generation logic
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        Roles: user.roles.map(role => ({
          id: role.id,
          name: role.name,
          description: role.description,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
          Features: role.features.map(feature => ({
            id: feature.id,
            name: feature.name,
            createdAt: feature.createdAt,
            updatedAt: feature.updatedAt,
          })),
        })),
      },
    };

    return transformedResponse;
  } catch (error) {
    console.error("Error fetching features:", error);
    throw new Error("Failed to fetch features");
  }
};
// User Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    const user = await users.create({ username, email, password:hashedPassword });
  
    // Example usage

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOne({ where: { username } });
    
     
    
      if(!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    const data = await getUserFeatures(user.username);
      

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: '1h',
    });
    res.json({ message: 'Login successful',token,data});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected Route
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware for JWT Verification
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.user = decoded;
    next();
  });
}

module.exports = router;