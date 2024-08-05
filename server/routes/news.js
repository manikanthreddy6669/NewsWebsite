const router = require('express').Router();
const { fetchNews } = require('../controllers/newsController');

router.route('/news').get(fetchNews);

module.exports = router;
