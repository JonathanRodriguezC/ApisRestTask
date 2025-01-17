const express = require('express')
const app = express();
const port = 3000;

app.use(express.json())

let tasks = []

app.get('/tasks', (req, res) => {
    res.json(tasks)
})

app.post('/tasks', (req, res) => {
    const newtask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
    }
    tasks.push(newtask)
    res.status(201).json(newtask)
})

app.get('/tasks/:id', (req, res) => {
    const tasksID = parseInt(req.params.id)
    const task = tasks.find(t => t.id === tasksID)
    if (task) {
        res.json(task)
    } else {
        res.status(404).send('No se encontro la tarea')
    }
})


app.put('/tasks/:id', (req, res) => {
    const tasksID = parseInt(req.params.id)
    const task = tasks.find(t => t.id === tasksID)
    if (task) {
        task.title = req.body.title || task.title
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed
        res.json(task)
    } else {
        res.status(404).send('No se actualizo la tarea')
    }
})

app.delete('/tasks/:id', (req, res) => {
    const tasksID = parseInt(req.params.id)
    const taskin = tasks.findIndex(t => t.id === tasksID)
    if (taskin !== -1) {
        tasks.splice(taskin, 1)
        res.status(204).send('Registro eliminado')
    } else {
        res.status(404).send('No se elimino la tarea')
    }
})


app.listen(port, () => {
    console.log(`Servidor corriendo en la URl http://localhost:${port}`)
})