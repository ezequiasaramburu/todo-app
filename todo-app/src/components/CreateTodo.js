import React, { Component } from 'react';

export default class CreateTodo extends Component {
    constructor(props) {
      super(props);

      this.state = {
          description: {
            text: ''
          },
          file: null,
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
      console.log(event.target.files[0]);
      this.setState({
        file: event.target.files[0]
      });
    }

    onSubmit(event) {
      event.preventDefault();
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