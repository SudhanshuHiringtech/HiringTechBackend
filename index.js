const express = require('express');
const mongoose = require('mongoose');

const passport = require('passport');
const cookieSession = require('cookie-session');
require('./config/passport-setup');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./db');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const jobPostRoutes = require('./routes/jobPostRoutes');
const jobApplyRoutes = require('./routes/jobApplyRoutes');
const filterjobsRoutes = require('./routes/filterjobsRoutes');
const h = require('./routes/h');

connectDB();

// Middleware to parse JSON

// Set up view engine
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_SECRET || 'sector123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Set to true if using https
}));


app.use(passport.initialize());
app.use(passport.session());
// Configure session middleware


app.use(express.json({ extended: false }));
app.use(bodyParser.json());

//app.use('/auth', require('./routes/authRoutes'));
app.use('/profile', require('./routes/profile-routes'));
app.use(authRoutes);
app.use(profileRoutes);
app.use(jobPostRoutes);
app.use(jobApplyRoutes);
app.use(filterjobsRoutes);
//app.use(passwordresetRoutes);
app.use(h);

app.get('/', (req, res) => {
  res.send('Hello World!');
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
