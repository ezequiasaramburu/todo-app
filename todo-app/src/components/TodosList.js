import React, { Component } from 'react';
import {
  getAllTodos,
  resolveTodo,
  deleteTodo
} from '../api/services/todos';

const Todo = props => (
  <tr>
      <td className='col-md-4' > 
        { props.todo.description.text } 
      </td>
      <td className='col-md-4'>
      </td>
      <td className='col-md-2' >
          <button onClick={() => resolveTodo(props.todo._id)} >
              Resolve
          </button>
      </td>
      <td className='col-md-2' >
          <button onClick={() => deleteTodo(props.todo._id)} >
              Delete
          </button>
      </td>
  </tr>
);

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

    getTodos = async () => {
      await getAllTodos()
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
            return <Todo todo={currentTodo} key={i} />;
        });
    };

    resolveTodo = async (todoId) => {
      await resolveTodo(todoId)
          .then(res =>{
            alert('Resolved successfully');
          })
          .catch(error =>{
            console.log(error);
            alert('Somenthing went wrong resolving Todo');
          });
    };

    deleteTodo = async (todoId) => {
      await deleteTodo(todoId)
          .then(res => {
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
                          <th>Description</th>
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