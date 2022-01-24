const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { LogModel } = require('../models');

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});

router.get('/log', (req, res) => {
    res.send('Hey!! This is the user log route!')
});

/* Journal Create */

router.post('/create', validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/about"), (req, res) => {
    res.send("This is the about route!")
}

module.exports = router;