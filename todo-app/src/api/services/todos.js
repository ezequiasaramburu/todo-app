import  API  from '../api';

const PREFIX = '/todos';

export const getAllTodos = () => API.get(`${PREFIX}/`);

export const createTodo = (newTodo) => API.post(`${PREFIX}/add`, newTodo);

export const resolveTodo = (todoId) => API.put(`${PREFIX}/update/${todoId}`);

export const deleteTodo = (todoId) => API.delete(`${PREFIX}/delete/${todoId}`);

export const uploadFile = (file) => API.post('/upload', file);