//Actions Routes
const express = require('express');
const router = express.Router();

const actionModel = require('../data/helpers/actionModel.js');

//Middleware for actions

// GET all actions
router.get('/', (req, res) => {
    actionModel.get().then(actions => {
        console.log(actions);
        res.status(200).json(actions);
     })
    .catch(error => res.status(500).send({ error: "The actions information could not be retrived."}));
});

// GET actions by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionModel.get(id).then(action => {
        if(action.length === 0) {
            return res.status(404).send({ message: "The action with the specified id does not exist." });
        }
        res.status(200).json(action);
    })
    .catch(error => res.status(500).send({ error: "The action information could not be retrieved." }));
});

// //Post new action
router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };
    actionModel.insert(newAction).then(actionId =>
        res.status(200).json(newAction)
    )
    .catch(error => {
        if(!description) {
            return res.status(400).send({ errorMessage: "Please provide a description to create a new action." });
        } else if(!project_id) {
            res.status(422).send({ Error: `There is no action by this project id ${project_id}`});
        } else {
            res.status(500).send({ error: "There was an error while saving the new action to the database." });
        }
    })
})

//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    actionModel.remove(id).then(deletedAction => {
        if(!deletedAction) {
            return res.status(404).send({ Error: "The action with the specified ID does not exist." });
        } else {
            res.status(200).json({ message: "You successfully deleted the action." });
        }
    })
    .catch(error => res.status(500).send({ error: "The action failed to delete." }));
 });

//Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };
    actionModel.update(id, newAction).then(action => {
        console.log(action);
        if(!description) {
            res.status(400).send({ errorMessage: "Please provide a description for the action." })
        } else if (!user) {
            res.status(404).send({ message: "The action with the specified ID does not exist." })
        } else {
            res.status(200).json(req.body);
        }})
        .catch(error => res.status(500).send({ error: "The action information could not be modified."}))
    });

    module.exports = router;