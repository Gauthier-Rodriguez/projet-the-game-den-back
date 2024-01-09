const express = require('express');
const app = express();
const cors = require('cors');

const router = require('./src/routers');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to my auth API')
});

app.use('/auth', authRouter);
app.use('/api', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});