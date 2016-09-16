import express      from 'express'
let router = express.Router()

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res, next) => {
  res.render('index/index')
});

module.exports = router;
