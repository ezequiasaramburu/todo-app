import React, { Component } from 'react';
import { getAllTodos } from '../api/services/todos';

const Todo = props => (
  <tr>
      <td className='col-md-8' > { props.todo.description.text } </td>
      <td className='col-md-2' >
          <button> Resolve </button>
      </td>
      <td className='col-md-2' >
        <button> Delete </button>
      </td>
  </tr>
);

export default class TodosList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        todos: []
      };
    }

    async componentDidMount() {
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
    }

    todoList = () => {
      const { todos } = this.state;
        return todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
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
                      { this.todoList() }
                  </tbody>
              </table>
          </div>
        )
    }
}