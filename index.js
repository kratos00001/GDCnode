const express = require('express');
const authRoutes = require('./auth.routes'); 

const app = express();
const port = process.env.PORT;

app.use('/', authRoutes); // This line registers your routes with the Express application

app.listen(port, () => console.log(`Server running on port ${port}`));
