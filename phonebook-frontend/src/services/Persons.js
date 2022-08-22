import axios from 'axios'

const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(`${baseUrl}`);
};

const add = (person) => {
    return axios.post(`${baseUrl}`, person);
}

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

const update = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person);
}

const personsService = { getAll, add, del, update }

export default personsService;