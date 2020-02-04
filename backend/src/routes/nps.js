const router = require('express').Router();

const npsData = require('../../data.json');

router.get('/nps', (_req, res) => {
    res.send(npsData);
});

module.exports = router;
