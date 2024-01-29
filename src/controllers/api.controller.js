const axios = require('axios');
const { API_TOKEN, CLIENT_ID } = process.env;
const getLogo = require('../utils/getLogo');

const getAllApiPlatforms = async (req, res) => {
  const queryBody = `fields name; 
  where 
  versions.platform_version_release_dates.date > 759593424 
  & 
  id !=(13,23, 30, 32, 50, 59, 72, 73, 87, 122, 136, 238, 239, 240, 274, 308, 386, 407, 410, 414, 416, 417, 439, 471)
  &
  (category = 1 | category = 4);
  sort id asc;
  limit 30;`;
  const results = await axios.post('https://api.igdb.com/v4/platforms', queryBody,{
    headers: {'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + API_TOKEN}
  });
  console.log(results.data);
  res.status(200).json(results.data);
};

const getAllApiGenres = async (req, res) => {
  const queryBody = `fields name;limit 50;`;
  const results = await axios.post('https://api.igdb.com/v4/genres', queryBody,{
    headers: {'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + API_TOKEN}
  });
  console.log(results.data);
  res.status(200).json(results.data);
};

const searchResults = async (req, res) => {
  const queryBody = `fields id, name, platforms.name, platforms.platform_logo.image_id, cover.image_id;
  where name ~ *"${req.query.search}"* & rating >50 & rating_count >40;
  limit 40;`;

  const results = await axios.post('https://api.igdb.com/v4/games', queryBody,{
  headers: {'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + API_TOKEN}
  });



    const games = results.data.map((game) => ({
      id : game.id,
      name: game.name,
      cover : game.cover ? `https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg` : null,
      platforms: game.platforms.map((platform) => ({
        id : platform.id,
        name : platform.name,
        logo : getLogo(platform)
      }))
    }))
      res.status(200).json(games);
};

const getAllPopularGames = async (req, res) => {
  const queryBody = `fields name, platforms.name, platforms.platform_logo.url, cover.url, genres.name;
  where release_dates.date > 1672527600 & rating >80 & rating_count >50;
  sort rating desc;
  limit 40;`;
 
    const results = await axios.post('https://api.igdb.com/v4/games', queryBody,{
    headers: {'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + API_TOKEN}
  });

    const games = results.data.map((game) => ({
      id : game.id,
      name: game.name,
      cover : `https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg`,
      platforms: game.platforms.map((platform) => ({
        id : platform.id,
        name : platform.name,
        logo : getLogo(platform)
      }))
    }))
      res.status(200).json(games);
};

const getGameDetails = async (req, res) => {
  const GameID = req.params.id;
  const queryBody = `fields name, platforms.name, platforms.platform_logo.url, cover.url, cover.image_id, summary, genres.name, involved_companies.company.name, involved_companies.company.websites.url, first_release_date;
  where id=${GameID};`;

  const results = await axios.post('https://api.igdb.com/v4/games', queryBody,{
    headers: {'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + API_TOKEN}
  });
  console.log(results.data);
    const gameDetails = results.data.map((game) => ({
      id : game.id,
      name: game.name,
      cover : `https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg`,
      platforms: game.platforms.map((platform) => ({
        id : platform.id,
        name : platform.name,
        logo : getLogo(platform)
      })),
      summary: game.summary,
      genres: game.genres.map((genre) => ({
        id : genre.id,
        name : genre.name,
      })),
      involved_companies: game.involved_companies.map((company) => ({
        id : company.id,
        name : company.company.name,
        website : company.company.websites?.url,
      })),
      first_release_date: game.first_release_date,
    }))
      res.status(200).json(gameDetails);
};

const getGamesReco = async (req, res) => {
  console.log(req.query);
  const {genres, platforms} = req.query;
  const queryBody = `fields id, name, platforms.name, platforms.platform_logo.image_id, cover.image_id;
  where genres=(${genres}) & platforms=(${platforms});
  sort date asc;
  limit 40;`;

  const results = await axios.post('https://api.igdb.com/v4/games', queryBody,{
  headers: {'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + API_TOKEN}
  });

  const games = results.data.map((game) => ({
    id : game.id,
    name: game.name,
    cover : `https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg`,
    platforms: game.platforms.map((platform) => ({
      id : platform.id,
      name : platform.name,
      logo : getLogo(platform)
    }))
  }))
    res.status(200).json(games);
};

module.exports = 
{getAllApiPlatforms,
getAllApiGenres,
searchResults,
getAllPopularGames,
getGameDetails,
getGamesReco}