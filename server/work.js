const express = require('express');
const workRouter = express.Router({mergeParams: true});
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db.js');

workRouter.get('/', (req, res, next) => {
    const work = getAllFromDatabase('work').filter(singleWork => {
        return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
});

module.exports = workRouter;