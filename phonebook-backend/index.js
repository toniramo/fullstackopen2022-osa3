const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');

const app = express();
app.use(express.json());
app.use(express.static('build'));

morgan.token('req-body', function getPostData(req, res) {
    if (req.method === 'POST') return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

/*
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
];*/

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons));
});

app.get('/api/info', (request, response) => {
    Person.find({}).then(persons => {
        const info1 = `<p>Phonebook has info for ${persons.length} people.</p>`;
        const info2 = `<p>${new Date()}</p>`;
        response.send(info1.concat(info2));
    });
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    Person.findById(id).then(person => {
        person ? response.json(person) : response.status(404).end();
    })
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id).then(person => {
        if (!person) {
            return response.status(404).end();
        }
        response.status(204).end()
    });
    //    if (!persons.find(person => person.id === id)) {
    //       return response.status(404).end();
    //  }
    //  persons = persons.filter(person => person.id !== id);
    //  response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).send({ error: 'person must have a name and a number' });
    }
    /*if (persons.find(person => person.name === body.name)) {
        return response.status(409).send({ error: 'name already exists in phonebook' })
    }*/
    Person.find({ name: body.name }).then(foundPerson => {
        if (foundPerson.length) {
            return response.status(409).send({ error: 'name already exists in phonebook' });
        }
        const person = new Person({
            name: body.name,
            number: body.number
        });
        person.save().then(savedPerson => {
            response.json(savedPerson);
        })
    })
    /*
       const person = new Person({
           name: body.name,
           number: body.number
       });
   
   
       person.save().then(savedPerson => {
           persons = persons.concat(savedPerson);
           response.json(savedPerson);
       });*/
});

//const generateId = () => {
//    return Math.floor(Math.random() * 1e6) + 1;
//}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}.`)
});