require('dotenv/config');
const express = require('express');
const cors = require('cors');

const router = require('./src/routers');

const app = express();
app.use(cors({origin: "*",}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(express.static("./dist"));



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});