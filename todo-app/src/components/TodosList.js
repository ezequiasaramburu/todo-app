import React, { Component } from 'react';
import {
  getAllTodos,
  resolveTodo,
  deleteTodo
} from '../api/services/todos';
import { TASK_STATUS } from '../utils/const/const';

const Todo = (props) => {
  const { todo, remove, resolve } = props;
  return (
    <tr>
      <td className='col-md-4'>
        { todo._id }
      </td>
      <td className='col-md-8' > 
        { todo.description.text } 
      </td>
      <td className='col-md-5'>
        { "todo.description.file"}
      </td>
      {todo.status === TASK_STATUS.RESOLVED ? (
        <td>
          { 'RESOLVED' }
        </td>
      ) : (  
        <td className='col-md-2' >
          <button onClick={() => resolve(todo._id)} >
            Resolve
          </button>
        </td>
      )}
      <td className='col-md-2' >
        <button onClick={() => remove(todo._id)} >
          Delete
        </button>
      </td>
    </tr>
  )
};

export default class TodosList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        todos: []
      };
    };

    componentDidMount() {
      this.getTodos();
    };

    getTodos = () => {
      getAllTodos()
        .then(res => {
          console.log(res);
          const { todos } = res.data;
          this.setState({ todos: todos });
        })
        .catch(error => {
          console.log(error);
          alert('Somenthing went wrong fetching Todos List');
        });
    };

    todoList = () => {
      const { todos } = this.state;
        return todos.map((currentTodo, i) => {
          return <Todo todo={currentTodo} remove={this.deleteTodo} resolve={this.resolveTodo} key={i} />;
        });
    };

    resolveTodo = (todoId) => {
      resolveTodo(todoId)
        .then(res =>{
          this.getTodos(); // For test only, correct way to update render is with redux.
          alert('Resolved successfully');
        })
        .catch(error =>{
          console.log(error);
          alert('Somenthing went wrong resolving Todo');
        });
    };

    deleteTodo = (todoId) => {
      deleteTodo(todoId)
        .then(res => {
          console.log(res);
          this.getTodos(); // For test only, correct way to update render is with redux.
          alert('Deleted successfully');
        })
        .catch(error => {
          console.log(error);
          alert('Somenthing went wrong deleting Todo');
        });
    };

    render() {
      const todos = this.todoList();
        return (
          <div>
              <h3>Todos List</h3>
              <table className="table" style={{ marginTop: 20 }} >
                <thead className='col-md-12'>
                  <tr>
                    <th className='col-md-1'>ID</th>
                    <th className="col-md-2">Description</th>
                    <th className="col-md-5">File</th>
                    <th className="col-md-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { todos }
                </tbody>
              </table>
          </div>
        )
    }
}