const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');

const app = express();
app.use(express.json());
app.use(express.static('build'));

morgan.token('req-body', function getPostData(req, res) {
    if (['POST', 'PUT'].includes(req.method)) return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

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

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person
        .findById(id)
        .then(person => {
            person
                ? response.json(person)
                : response.status(404).end();
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person
        .findByIdAndDelete(id)
        .then(person => {
            person
                ? response.status(204).end()
                : response.status(404).end();

        })
        .catch(error => next(error));
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).send({ error: 'person must have a name and a number' });
    }
    Person
        .find({ name: body.name })
        .then(foundPerson => {
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
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    const body = request.body;
    if (!body.number) {
        return response.status(400).send({ error: 'person must have a number' });
    }

    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(id, person, { new: true })
        .then(updatedPerson => {
            updatedPerson
                ? response.json(updatedPerson)
                : response.status(404).end();
        })
        .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.log('error.message :>> ', error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' });
    }
    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}.`)
});