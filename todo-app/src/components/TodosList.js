import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFile } from '@fortawesome/free-solid-svg-icons';
import {
  getAllTodos,
  resolveTodo,
  deleteTodo
} from '../api/services/todos';
import { TASK_STATUS } from '../utils/const/const';

library.add(faFile);
const Todo = (props) => {
  const { todo, remove, resolve } = props;
  return (
    <Row 
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 5,
        paddingBottom: 5,
        background: '#e6e6e6',
        borderRadius: 3,
        height: 'auto',
      }}
    >
      <Col xs='1' md='1'>
        { todo._id }
      </Col>
      <Col xs='4' md='4'>
        { todo.description.text } 
      </Col>
      { todo.description.file ? (
        <Col xs='3' md='3'>
          <FontAwesomeIcon
            color="white"
            icon="file"
            size='3x'
          />
        </Col>
      ) : (
        <Col xs='3' md='3'>
          { 'No file attached' }
        </Col>
      )}
      { todo.status === TASK_STATUS.RESOLVED ? (
        <Col xs='2' md='2' style={{color: 'green'}}>
          { 'RESOLVED' }
        </Col>
      ) : (  
        <Col xs='2' md='2'>
          <button onClick={() => resolve(todo._id)} >
            Resolve
          </button>
        </Col>
      )}
      <Col xs='2' md='2'>
        <button onClick={() => remove(todo._id)} >
          Delete
        </button>
      </Col>
    </Row>
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
          this.getTodos(); // For test only, correct way to update render is with redux.
          alert('Deleted successfully');
        })
        .catch(error => {
          console.log(error);
          alert('Somenthing went wrong deleting Todo');
        });
    };

    render() {
      const { todos } = this.state;
        return (
          <div>
              <h3>Todos List</h3>
              <Container style={{ marginTop: 20 }} >
                <Row style={{ fontWeight: 'bold', background: '#d3d3d3', borderRadius: 2 }}>
                  <Col xs='1' md='1'> { 'ID' }</Col>
                  <Col xs='4' md='4'>{ 'Description' }</Col>
                  <Col xs='3' md='3'>{ 'File' }</Col>
                </Row>
                { todos.map((currentTodo, i) => {
                  return <Todo 
                          todo={currentTodo}
                          remove={this.deleteTodo}
                          resolve={this.resolveTodo}
                          key={i}
                        />
                })}
              </Container>
          </div>
        )
    }
}