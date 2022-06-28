const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
    try {
        const tasksList = await Task.find();
        return res.render("index", { tasksList, task: null });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createTask = async (req, res) => {
    const task = req.body;
    if (!task.task) {
        return res.redirect("/");
    }
    try {
        await Task.create(task);
        return res.redirect("/");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        const tasksList = await Task.find();
        res.render("index", { task, tasksList });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const updateOneTask = async (req, res) => {
    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task);
        res.redirect("/");
    } catch (error) {
        res.status(500).send({ error: err.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask
};