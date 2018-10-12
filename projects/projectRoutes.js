//Projects Routes
const express = require('express');
const router = express.Router();

const projectModel = require('../data/helpers/projectModel.js');

//Middleware for projects

// GET all actions
router.get('/', (req, res) => {
    projectModel.get().then(projects => {
        console.log(projects);
        res.status(200).json(projects);
     })
    .catch(error => res.status(500).send({ error: "The projects information could not be retrived."}));
});

// GET actions by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectModel.get(id).then(project => {
        if(project.length === 0) {
            return res.status(404).send({ message: "The project with the specified id does not exist." });
        }
        res.status(200).json(project);
    })
    .catch(error => res.status(500).send({ error: "The project information could not be retrieved." }));
});

// //Post new action
router.post('/', (req, res) => {
    const { name, description } = req.body;
    const newProject = { name, description };
    projectModel.insert(newProject).then(projectId =>
        res.status(200).json(newProject)
    )
    .catch(error => {
        if(!name) {
            return res.status(400).send({ errorMessage: "Please provide a name to create a new project." });
        } else if(!project) {
            res.status(422).send({ Error: `There is no project by this id ${id}`});
        } else {
            res.status(500).send({ error: "There was an error while saving the new project to the database." });
        }
    })
})

//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    projectModel.remove(id).then(deletedProject => {
        if(!deletedProject) {
            return res.status(404).send({ Error: "The project with the specified ID does not exist." });
        } else {
            res.status(200).json({ message: "You successfully deleted the project." });
        }
    })
    .catch(error => res.status(500).send({ error: "The project failed to delete." }));
 });

//Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const newProject = { name, description };
    projectModel.update(id, newProject).then(project => {
        console.log(project);
        if(!name) {
            res.status(400).send({ errorMessage: "Please provide a name for the action." })
        } else if (!project) {
            res.status(404).send({ message: "The project with the specified ID does not exist." })
        } else {
            res.status(200).json(req.body);
        }})
        .catch(error => res.status(500).send({ error: "Project information could not be modified."}))
    });

    module.exports = router;