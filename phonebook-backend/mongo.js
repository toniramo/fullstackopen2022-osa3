const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('you must give password as an argument');
  process.exit(1);
}

const password = process.argv[2];

const url =
    `mongodb+srv://fullstackopen22:${password}@cluster0.6wxtcyj.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const addPerson = (name, number) => {

  console.log('adding new person', name, number);
  const person = new Person({
    name: name,
    number: number
  });

  console.log('person :>> ', person);

  person
    .save()
    .then(result => {
      console.log('person saved.');
      console.log('result :>> ', result);
      mongoose.connection.close();
      return result;
    }).catch(error => console.log('error :>> ', error));
};

const getAll = () => {
  console.log('Phonebook:');
  Person
    .find({})
    .then(result => {
      result.forEach(person => console.log(person.name, person.number));
      mongoose.connection.close();
    });
};

if (process.argv.length > 4) {
  const name = process.argv[3];
  const number = process.argv[4];

  return addPerson(name, number);
}

getAll();
