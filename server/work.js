const express = require('express');
const workRouter = express.Router({mergeParams: true});
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db.js');

workRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

workRouter.get('/', (req, res, next) => {
    const work = getAllFromDatabase('work').filter(singleWork => {
        return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
});

workRouter.put('/:workId', (req, res, next) => {
    if (req.params.minionId === req.body.minionId) {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    } else {
        res.status(400).send();
    }
});

workRouter.post('/', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const newWork = addToDatabase('work', workToAdd);
    res.status(201).send(newWork);
});

workRouter.delete('/:workId', (req,res, next) => {
    const isWorkDeleted = deleteFromDatabasebyId('work', req.params.workId);
    if (isWorkDeleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

module.exports = workRouter;