const express = require('express');
const ideasRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get('/', (req,res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const isIdeaDeleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(isIdeaDeleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})

module.exports = ideasRouter;