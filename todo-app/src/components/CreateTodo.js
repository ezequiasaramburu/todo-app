import React, { Component } from 'react';
import { createTodo } from '../api/services/todos';
import { getImageFullUrl, uploadFiles } from '../utils/files';

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

  onCreateTodo = newTodo => {
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
  }

  onUploadFile = async file => {
    return await uploadFiles(file);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const file = this.fileInput;
    const imgUrl = getImageFullUrl(file.name);
    const newTodo = {
      description: {
        text: this.state.text,
        file: imgUrl
      }
    };
    if (this.state.text) {
      if (file.name) {
        const fileUploded = this.onUploadFile(file);
        fileUploded
          .then(res => {
            this.onCreateTodo(newTodo);
          })
          .catch(err => {
            console.log(err);
          });
      };
      if(!file.name) {
        this.onCreateTodo(newTodo);
      }
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