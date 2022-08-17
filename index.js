const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-654321",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/info', (request, response) => {
    const info1 = `<p>Phonebook has info for ${persons.length} people.</p>`;
    const info2 = `<p>${new Date()}</p>`;
    response.send(info1.concat(info2));
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    person ? response.json(person) : response.status(404).end();
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    if (!persons.find(person => person.id === id)) {
        return response.status(404).end();
    }
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}.`)
})