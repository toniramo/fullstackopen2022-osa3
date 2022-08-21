import axios from 'axios'

const baseUrl = 'http://localhost:3001';

const getAll = () => {
    return axios.get(`${baseUrl}/api/persons`);
};

const add = (person) => {
    return axios.post(`${baseUrl}/api/persons`, person);
}

const del = (id) => {
    return axios.delete(`${baseUrl}/api/persons/${id}`);
}

const update = (person) => {
    return axios.put(`${baseUrl}/api/persons/${person.id}`, person);
}

const personsService = { getAll, add, del, update }

export default personsService;