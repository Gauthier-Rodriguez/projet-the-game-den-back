const {Game, User} = require('../models');

const getAllGames = async (req, res) => {

  const userid = req.params.id;

  const user = await User.findByPk(userid, {include: ["games"]})
  if (!user) {
    return res.status(404).json({ error: "User not found. Please verify the provided id." });
  } 

  const games = user.games

  res.status(200).json(games)

};

const addGameToUser = async (req, res) => {
  const userId = req.params.id;  
  console.log(req.body.gameId)

  const newGame = new Game({
    GameID : req.body.gameId,
    Name : req.body.gameName,
    Image : req.body.gameImage
  })
   const gameExist = await Game.findOne({where: {GameID : req.body.gameId}});
  if(!gameExist){
    newGame.save();
  } 

  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: "userId should be a valid ID." });
  } 

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found. Please verify the provided id." });
  } 

  const game = await Game.findOne({where: {GameID : req.body.gameId}});
  if (!game) {
    return res.status(404).json({ error: "Game not found. Please verify the provided id." });
  } 
 
  await user.addGame(game);

  const updatedUser = await User.findByPk(userId, { include: ["games"] });
  const games = updatedUser.games
  res.status(201).json(games);
};


const deleteGame = async (req, res) => {
    const userId = req.params.id;
    const gameId = req.body.gameId;

    if (isNaN(parseInt(userId))) {
        return res.status(400).json({ error: "userId should be a valid ID." });
      }
    
      const user = await User.findByPk(userId);
      if (!user) {
        return res.json({ error: "User not found. Please verify the provided id." });
      }
    
      const game = await Game.findOne({where: {GameID : gameId}});
      if (!game) {
        return res.json({ error: "Game not found. Please verify the provided id." });
      }
    
      await user.removeGame(game);
      
      const updatedUser = await User.findByPk(userId, { include: ["games"] });
      const games = updatedUser.games || [];
      res.status(201).json(games);
};


module.exports = {
  getAllGames,
  addGameToUser,
  deleteGame
}