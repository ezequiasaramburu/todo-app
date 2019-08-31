import  API  from '../api';

const PREFIX = '/todos';

export const getAllTodos = () => API.get(`${PREFIX}/`);

export const createTodo = (newTodo) => API.post(`${PREFIX}/add`, newTodo);
