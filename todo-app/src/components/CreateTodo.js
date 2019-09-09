import React, { Component } from 'react';
import { createTodo, uploadFile } from '../api/services/todos';

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: {
        text: '',
        file: null,
      }
    }
  };
  onChangeDescription = (event) => {
    this.setState({
      description: {
        text: event.target.value
      }
    });
  };
  onAddFile = (event) => {
    this.setState({
      description: {
        file: event.target.files[0]
      }
    });
  }

  onUploadFile = (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('filename', file.name);
    uploadFile(data)
      .then(res => {
        alert('File upload successfully');
        this.setState({
          description: {
            file: null
          }
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          description: {
            file: null
          }
        });
        alert('Somenthing went wrong updating file');
      });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      description: {
        text: this.state.description.text
      }
    }
    const file = this.state.description.file;
    if (file !== undefined) this.onUploadFile(file);
    createTodo(newTodo)
      .then(res => {
        alert('New Todo successfully added')
      })
      .catch(error => {
        console.log(error);
        alert('Somenthing went wrong Creating Todo');
      });
      this.setState({
        description: { 
          text: ''
        },
        status: ''
      })
  };
  render() {
    return (
      <div style={{marginTop: 20}}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Description: </label>
            <input  
                type="text"
                className="form-control"
                value={this.state.description.text}
                onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group files">
            <label>Attach File: </label>
            <input 
              type="file" 
              className="form-control files"
              onChange={this.onAddFile}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Todo" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}