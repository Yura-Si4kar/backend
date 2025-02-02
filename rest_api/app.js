const express = require('express');
const path = require('path');
const { v4 } = require('uuid');
const app = express();

let CONTACTS = [
    { id: v4(), name: 'Юра', value: 32, marked: false }
]

app.use(express.json())

// Спочатку маршрут для статичних файлів
app.use(express.static(path.resolve(__dirname, 'client')));

// Потім маршрути API
// GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS)
    }, 1000)
})

// POST
app.post('/api/contacts', (req, res) => {
    const contact = { ...req.body, id: v4(), marked: false };
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id);
    res.status(200).json({message: 'Контакт був видалений'})
})

// PUT
app.put('/api/contacts/:id', (req, res) => {
    const index = CONTACTS.findIndex(c => c.id === req.params.id);
    CONTACTS[index] = req.body;
    res.json(CONTACTS[index])
})

// Маршрут для будь-яких інших запитів
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
})

app.listen(3000, () => console.log('Server has been started on port 3000...'));
