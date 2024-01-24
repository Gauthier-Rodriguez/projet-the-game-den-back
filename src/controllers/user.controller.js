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
  const {firstname, lastname, pseudo, email, password} = req.body; 
    
  if (!firstname || !lastname || !pseudo) {
      return res.status(400).json({ error: 'All fields are required' });
  }
  
  const pseudoExist = await User.findOne({where: {Pseudo : req.body.pseudo}});
  
  if(pseudoExist) return res.status(400).send('Pseudo already taken');
  
  const emailExist = await User.findOne({where: {Email : req.body.email}});
  
  if(emailExist) return res.status(400).send('Email already taken');
  
  if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address'});
  };
  
  if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Weak password. Please choose a stronger password'});
  };
  
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  
  if(typeof firstname !== "string")
    {res.status(400).json({ error : 'Your first name is not valid'})};
  
  if(typeof lastname !== "string")
    {res.status(400).json({ error : 'Your last name is not valid'})};
  
  const user = new User({
    FirstName : req.body.firstname,
    LastName : req.body.lastname,
    Pseudo : req.body.pseudo,
    Email : req.body.email,
    Password : hashPassword
  });

  user.save();
};

const loginUser = async (req, res) => {

  const user = await User.findOne({where :{Email : req.body.email}});
  if(!user) return res.status(400).send('Email not found, please sign up');
 
  const validPass = await bcrypt.compare(req.body.password, user.Password);
  if(!validPass) return res.status(400).send('Password or Email not valid');

  const token = jwt.sign({pseudo : user.Pseudo, id : user.id}, process.env.SECRET);
  res.header('auth-token', token);
  res.json(token);
};

const getAllInfos = async (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)){
    return res.status(400).json({error : "Invalid userId provided"})
  }
  const infos = await User.findByPk(userId, {
    include: ["platforms", "genres"],
    expiresIn: '3h'
  });
  
  if(!infos) {
    return res
    .status(404)
    .json({error : 'User not found'})
    
  };

  res.status(200).json(infos)
};

const updateInfos = async (req, res) => {
    const userId = parseInt(req.params.id);

    if(isNaN(userId)) {
        return res.status(400).json({ error: "Invalid userId provided." });
    }

    const { firstname, lastname, pseudo, email, password } = req.body; 
    if (firstname && typeof firstname !== 'string') {
      return res.status(400).json({ error: "Invalid type for property 'firstname'" });
    }

    if (lastname && typeof lastname !== 'string') {
      return res.status(400).json({ error: "Invalid type for property 'lastname'" });
    }
    
    if (pseudo && typeof pseudo !== 'string') {
      return res.status(400).json({ error: "Invalid type for property 'pseudo'" });
    }
    if(req.body.Pseudo){
    const pseudoExist = await User.findOne({where: {Pseudo : req.body.Pseudo}});
    if(pseudoExist) return res.status(400).send('Pseudo already taken');
    }

    if (email && typeof email !== 'string') {
      return res.status(400).json({ error: "Invalid type for property 'email'" });
    }
    
    if(req.body.Email){
    const emailExist = await User.findOne({where: {Email : req.body.Email}});
    if(emailExist) return res.status(400).send('Email already taken');
  }
  let hashPassword;  // Declare hashPassword at a higher scope

  if (req.body.Password) {
      if (!validator.isStrongPassword(req.body.Password)) {
          return res.status(400).json({ error: 'Weak password. Please choose a stronger password'});
      }
  
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(req.body.Password, salt);  // Assign value to hashPassword here
      console.log(hashPassword);
  }
  
  const user = await User.findByPk(userId);
  
  if (!user) {
      return res.status(404).json({ error : "User not found" });
  }
  
  console.log(hashPassword);  // Now hashPassword is accessible here
  
  const updatedUser = await user.update({
      Pseudo: req.body.Pseudo || user.Pseudo,
      LastName: req.body.LastName || user.LastName,
      FirstName: req.body.FirstName || user.FirstName,
      Email: req.body.Email || user.Email,
      Password: hashPassword || user.Password  // hashPassword is used here
  });
    
    res.status(200).json(updatedUser);
};


module.exports = {
  isAuthenticated,
  createUser,
  loginUser,
  getAllInfos,
  updateInfos
};
