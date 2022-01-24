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

/* Get ALL entries */

router.get("/", async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/* Get Journals by user */

router.get("/mine", validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userLogs = await LogModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

/* Get Logs by id */

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const results = await LogModel.findAll({
            where: { id: id }
        })
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

/* Update a log */

router.put("/update/:entryId", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId, 
            owner_id: userId
        }
    };

    const updatedLog = {
        description: description,
        definition: definition,
        result: result 
    };
    try {
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

/* Delete a log */

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId, 
                owner_id: ownerId
            }
        };
    
    await LogModel.destroy(query);
        res.status(200).json({message: "Log entry deleted"});
    } catch (err) {
        res.status(500).json({error: err});
    }
})


router.get("/about"), (req, res) => {
    res.send("This is the about route!")
}

module.exports = router;