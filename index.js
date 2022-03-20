const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './env/.env' });
const session = require('express-session');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const router = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

// Cors
const corsOptions = {
    origin: 'http://localhost:3000',
    cors: true,
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

// Middleware and Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'shhhh', saveUninitialized: true, resave: true }));
app.use(router);

app.use(function(req, res, next){
    if(!req.user)
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    next();
})

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));