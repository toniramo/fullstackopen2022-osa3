const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('Connecting to', url);
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDb:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: v => /^(\d{2}-\d{5,}|\d{3}-\d{4,})$/.test(v),
      message: 'invalid number, expected format dd-ddddd... or ddd-dddd... (d=digit)'
    },
    required: true
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);