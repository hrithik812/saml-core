const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const ifaRoutes = require('./routes/ifainfo');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/ifa',ifaRoutes)
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
