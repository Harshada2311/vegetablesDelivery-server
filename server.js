const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
let port = 5400;

const productsRoutes = require('./Routes/productsRoutes');
const authRoutes = require('./Routes/authRoutes');
const testimonialsRouter = require('./Routes/testimonials');
const cartRoutes = require('./Routes/cartRoutes');

const allowed = ['http://localhost:3000', 'https://vegetablesdelivery-server.onrender.com'];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

//app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
//cors issue being resolved
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/', productsRoutes);
app.use('/', testimonialsRouter);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});