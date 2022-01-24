const Express = require('express');
const { LogModel } = require('../models');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt")

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});

router.get('/log', (req, res) => {
    res.send('Hey!! This is the user log route!')
});

router.post('/create', (req, res) =>{
    const {description, definition, result} = req.body.logs;
    const {id} = req.user;
    const {logEntry} = {
        description,
        definition,
        result,
        owner: id
    }
    try {
        const newLog = LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({error: err});

    }
});

module.exports = router;