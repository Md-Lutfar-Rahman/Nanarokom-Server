// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const authRoutes = require('./routes/auth'); // Ensure this is correctly named and located

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());

// Middleware

app.use(express.json()); // Parses incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Stop the server if MongoDB connection fails
    });

// Routes
app.use('/api/auth', authRoutes); // Ensure authRoutes is properly connected

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
