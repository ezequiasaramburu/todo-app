import React, { Component } from 'react';
import { createTodo, uploadFile } from '../api/services/todos';

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      text: ''
    }
  };
  onChangeDescription = (event) => {
    this.setState({
      text: event.currentTarget.value
    });
  };
  onAddFile = (event) => {
    this.fileInput = event.target.files[0];
  }

  onUploadFile = (file) =>  {
    const data = new FormData();
    data.append('file', file);
    data.append('filename', file.name);
    uploadFile(data)
      .then(res => {
        alert('File upload successfully');
      })
      .catch(err => {
        console.log(err);
        alert('Somenthing went wrong updating file');
      });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      description: {
        text: this.state.text
      }
    }
    if (this.state.text) {
      const file = this.fileInput;
      if (file !== null) {
        this.onUploadFile(file);
      }
      createTodo(newTodo)
        .then(res => {
          this.setState({
            text: '',
          });
          alert('New Todo successfully added')
        })
        .catch(error => {
          console.log(error);
          alert('Somenthing went wrong Creating Todo');
        });
    } else {
      alert('Description is required to add Todo');
    }
  };
  render() {
    const fileInputKey = this.fileInput.value ? this.fileInput.value.name : +new Date();
    return (
      <div style={{marginTop: 20}}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Description: </label>
            <input
                type="text"
                className="form-control"
                value={this.state.text}
                onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group files">
            <label>Attach File: </label>
            <input 
              type="file"
              key={fileInputKey}
              defaultValue={this.fileInput.current}
              className="form-control files"
              onChange={this.onAddFile}
              ref={ref => (this.fileInput = ref)}
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