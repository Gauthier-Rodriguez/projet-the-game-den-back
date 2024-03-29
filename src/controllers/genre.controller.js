const { Genre, User } = require('../models');


const addGenreToUser = async (req, res) => {
  const userId = req.params.id;
  const genreId = req.body.genreId;

  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: "userId should be a valid ID." });
  } 

   if (isNaN(parseInt(genreId))) {
    return res.status(400).json({ error: "genreId should be a valid ID." });
  }  

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found. Please verify the provided id." });
  } 

  const genre = await Genre.findByPk(genreId);
  if (!genre) {
    return res.status(404).json({ error: "Genre not found. Please verify the provided id." });
  } 

  await user.addGenre(genre);
  
  const updatedUser = await User.findByPk(userId, { include: ["genres"] });
  res.status(201).json(updatedUser.genres);

};

const deleteGenreToUser = async (req, res) => {
  const userId = req.params.id;
  const genreId = req.body.genreId;

  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: "userId should be a valid ID." });
  } 

   if (isNaN(parseInt(genreId))) {
    return res.status(400).json({ error: "genreId should be a valid ID." });
  }  

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found. Please verify the provided id." });
  } 

  const genre = await Genre.findByPk(genreId);
  if (!genre) {
    return res.status(404).json({ error: "Genre not found. Please verify the provided id." });
  } 

  await user.removeGenre(genre);
  
  const updatedUser = await User.findByPk(userId, { include: ["genres"] });
  res.status(201).json(updatedUser.genres);
};

const getAllGenres = async (req, res) => {
  const genres = await Genre.findAll()

  res.status(200).json(genres)
}


module.exports = {
addGenreToUser,
deleteGenreToUser,
getAllGenres
}