const router = require('express').Router();

router.use((req, res) => res.send('Error: Route Does Not Exist'));

module.exports = router;
