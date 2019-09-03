import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import TodosList from './components/TodosList';
import CreateTodo from './components/CreateTodo';

function App() {
  return (
    <Router>
      <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/todos" className="navbar-brand">Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/todos" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/todos/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/todos" exact component={TodosList} />
          <Route path="/todos/create" component={CreateTodo} />
        </div>
    </Router>
  );
}

export default App;
