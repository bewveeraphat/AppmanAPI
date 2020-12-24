const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('Start server at port 3000.')
})

// GET POST PUT DELETE students -----------------------------------------------------------------------
const students = require('./studentdb')
app.get('/students', (req, res) => {
    res.json(students)
})

app.get('/students/:id', (req, res) => {
    res.json(students.find(student => student.id === req.params.id))
})

app.post('/students', (req, res) => {
    students.push(req.body)
    res.status(201).json(req.body)
})

app.put('/students/:id', (req, res) => {
    const updateIndex = students.findIndex(student => student.id === req.params.id)
    res.json(Object.assign(students[updateIndex], req.body))
})

app.delete('/students/:id', (req, res) => {
    const deletedIndex = students.findIndex(student => student.id === req.params.id)
    students.splice(deletedIndex, 1)
    res.status(204).send()
})
//---------------------------------------------------------------------------------------------------------

// GET POST PUT DELETE universities -----------------------------------------------------------------------
const universities = require('./universitydb')

app.get('/universities', (req, res) => {
    res.json(universities)
})

app.get('/universities/:id', (req, res) => {
    var bachelor = [];
    bachelor = students.filter(student => student.bachelor === req.params.id);
    var master = [];
    master = students.filter(student => student.master === req.params.id);
    var university = universities.find(university => university.id === req.params.id);
    res.json({
        university, bachelor, master
    });
})

app.post('/universities', (req, res) => {
    universities.push(req.body)
    res.status(201).json(req.body)
})

app.put('/universities/:id', (req, res) => {
    const updateIndex = universities.findIndex(university => university.id === req.params.id)
    res.json(Object.assign(universities[updateIndex], req.body))
})

app.delete('/universities/:id', (req, res) => {
    const deletedIndex = universities.findIndex(university => university.id === req.params.id)
    universities.splice(deletedIndex, 1)
    res.status(204).send()
})

//--------------------------------------------------------------------------------------------------------


