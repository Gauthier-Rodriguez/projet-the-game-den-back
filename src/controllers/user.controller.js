const validator = require('validator');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res) => {
  try{
    res.json(req.user)
  }
  catch(err){
    res.json(err)
  }
};

const createUser = async (req, res) => {
  const {firstname, lastname, pseudo} = req.body; 
  
  if (!firstname || !lastname || !pseudo) {
        return res.status(400).json({ error: 'All fields are required' });
    }

  const emailExist = await User.findOne({email : req.body.email});
  if(emailExist) return res.status(400).send('Email already taken');

  if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address'});
    }

     if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Weak password. Please choose a stronger password'});
    }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const pseudoExist = await User.findOne({pseudo : req.body.pseudo});
  if(pseudoExist) return res.status(400).send('Pseudo already taken');

  if(typeof firstname !== "string")
  {res.status(400).json({ error : 'Your first name is not valid'})};

  if(typeof lastname !== "string")
  {res.status(400).json({ error : 'Your last name is not valid'})};

  const user = new User({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    pseudo : req.body.pseudo,
    email : req.body.email,
    password : hashPassword
  });

  user.save();
};

const loginUser = async (req, res) => {
  const user = await User.findOne({email : req.body.email});
  if(!user) return res.status(400).send('Email not found, please sign up');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Password or Email not valid');

  const token = jwt.sign({pseudo : user.pseudo, email : user.email}, process.env.SECRET);
  res.header('auth-token', token);
  res.json(token);
}

module.exports = {
  isAuthenticated,
  createUser,
  loginUser
};