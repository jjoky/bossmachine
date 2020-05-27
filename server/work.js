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

module.exports = workRouter;