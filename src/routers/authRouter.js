const express = require('express');
const authRouter = express.Router();
const Users = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
authRouter.use(express.json());

authRouter.post('/register', async (req, res) => {
  const emailExist = await Users.findOne({email : req.body.email});
  if(emailExist) return res.status(400).send('Email already taken');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new Users({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    pseudo : req.body.pseudo,
    email : req.body.email,
    password : hashPassword
  });

  user.save();
});

authRouter.post('/login', async (req, res) => {
  const user = await Users.findOne({email : req.body.email});
  if(!user) return res.status(400).send('Email not found, please sign up');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Password or Email not valid');

  const token = jwt.sign({firstname : user.firstname, email : user.email}, process.env.SECRET);
  res.header('auth-token', token);
  res.json(token);
})

module.exports = authRouter