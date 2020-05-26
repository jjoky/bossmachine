const express = require('express');
const ideasRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('./db.js');

ideasRouter.get('/', (req,res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

module.exports = ideasRouter;