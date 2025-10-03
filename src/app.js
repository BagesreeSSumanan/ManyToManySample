const express = require('express');
const config = require('./config/config');
const app = express();
require('dotenv').config();
app.use(express.json());

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});