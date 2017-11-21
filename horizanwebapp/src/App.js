import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Modal from 'react-modal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authModalIsOpen: false
    };
  }
  openAuthModal() {
    this.setState({
      authModalIsOpen: true
    })
  }
  closeAuthModal() {
    this.setState({
      authModalIsOpen: false
    })
  }
  render() {
    return (
      <div className="App">
        <Modal
          isOpen={this.state.authModalIsOpen}
          onRequestClose={this.closeAuthModal.bind(this)}
          contentLabel="Modal">
          <h1>Login/Signup</h1>
          <button onClick={this.closeAuthModal.bind(this)}>
            Close Modal
          </button>
        </Modal>
        <header>
          <nav className="Navbar">
            <div className="Logo">
              Horizan
            </div>
            <div className="Links">
              <ul>
                <li>
                  <button onClick={this.openAuthModal.bind(this)}>
                    Signup
                  </button>
                </li>
                <li>
                  <button onClick={this.openAuthModal.bind(this)}>
                    Login
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default App;
