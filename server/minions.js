const express = require('express');
const minionsRouter = express.Router();
const worksRouter = require('./work.js');
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db.js');

minionsRouter.use('/:minionId/work', worksRouter);

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const isMinionDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (isMinionDeleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

module.exports = minionsRouter;
