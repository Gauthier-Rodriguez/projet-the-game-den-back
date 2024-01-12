const {Platform, User} = require('../models');


const addPlatformToUser = async (req, res) => {
  const userId = req.params.id;  
  const platformId = req.body 

  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: "userId should be a valid ID." });
  } 

  if (isNaN(parseInt(platformId.platformId))) {
    return res.status(400).json({ error: "platformId should be a valid ID." });
  } 

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found. Please verify the provided id." });
  } 

  const platform = await Platform.findByPk(platformId.platformId);
  if (!platform) {
    return res.status(404).json({ error: "Platform not found. Please verify the provided id." });
  } 

  await user.addPlatform(platform);

  const updatedUser = await User.findByPk(userId, { include: ["platforms"] });
  res.status(201).json(updatedUser);
  
  const platforms = updatedUser.platforms || []
  res.status(200).json(platforms)
};

const getAllPlatforms = async (req, res) => {
  const platforms = await Platform.findAll();

  res.status(200).json(platforms);
}


const deletePlatformToUser = async (req,res) => {
  const userId = req.params.id;
  const platformId = req.body;

  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: "userId should be a valid ID." });
  }

  if (isNaN(parseInt(platformId.platformId))) {
    return res.status(400).json({ error: "platformId should be a valid ID." });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.json({ error: "User not found. Please verify the provided id." });
  }

  const platform = await Platform.findByPk(platformId.platformId);
  if (!platform) {
    return res.json({ error: "Platform not found. Please verify the provided id." });
  }

  await user.removePlatform(platform);

  const platforms = user.platforms || [];
  res.status(200).json(platforms);

};

module.exports = {
  addPlatformToUser,
  deletePlatformToUser,
  getAllPlatforms
}