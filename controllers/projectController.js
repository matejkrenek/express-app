const Project = require('../models/project');

const project_index = (req, res) => {
    Project.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('projects/index', { title: 'All Projects', projects: result })
        })
        .catch((err) => {
            console.log(err)
        })
}

const project_details = (req, res) => {
    const id = req.params.id;
    Project.findById(id)
        .then((result) => {
            res.render('projects/details', {project: result, title: 'Project Details'})
        })
        .catch((err) => {
            res.status(404).render('404', { title: '404 Not Found' });
        })
}

const project_create_get = (req, res) => {
    res.render('projects/create', { title: 'Project Create' })
}

const project_create_post = (req, res) => {
    const project = new Project(req.body);

    project.save()
        .then((result) => {
            res.redirect('/projects')
        })
        .catch((err) => {
            console.log(err)
        })
}

const project_delete = (req, res) => {
    const id = req.params.id;

    Project.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/projects' })
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    project_index,
    project_details,
    project_create_get,
    project_create_post,
    project_delete,
}