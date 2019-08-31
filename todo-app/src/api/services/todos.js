import  API  from '../api';

const PREFIX = '/todos';

export const createTodo = (newTodo) => API.post(`${PREFIX}/add`, newTodo);