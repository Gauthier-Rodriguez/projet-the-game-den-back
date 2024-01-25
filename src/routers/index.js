const { Router } = require("express");

const userRouter = require('./users.router');
const favGameRouter = require('./favgames.router');
const filterRouter = require('./filters.router');
const apirouter = require('./api.router');

const router = Router();

router.use(userRouter);
router.use(favGameRouter);
router.use(filterRouter);
//router.use(apirouter);


router.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = router;

