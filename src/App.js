import { React, Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    fName: '',
    lName: '',
    email: '',
  };

  // Handles changes of state to make it a controlled component
  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handles submit of information
  handleOnSubmit = (e) => {
    e.preventDefault();

    // Set current updated states to variables
    let userFName = this.state.fName;
    let userLName = this.state.lName;
    let userEmail = this.state.email;

    // Call getFunction and pass variables as parameters
    this.getFunction(userFName, userLName, userEmail);
  };

  // Makes get request
  getFunction = (fName, lName, email) => {
    const mkUrl =
      'https://mkpartners.secure.force.com/services/apexrest/careers?positionId=a0M4O00000qoC6UUAU';

    // create params object and set keys and values
    const params = {
      first: fName,
      last: lName,
      userEmail: email,
    };

    // call formatParams function, pass params, and set to query string
    const queryString = this.formatParams(params);
    // create final url by adding together mkUrl, '?', and queryString
    // const finalUrl = mkUrl + '?' + queryString;
    const finalUrl = mkUrl + '&' + queryString;

    console.log(finalUrl, 'FINAL URL');

    // make fetch request to get url
    fetch(finalUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      // mode: 'no-cors', // disabled CORS option
    })
      .then((res) => {
        res.json();
      })

      .catch((error) => console.log('ERROR', error));
  };

  // Takes in parameters and makes array of keys and creates a string with key and keys value, then sets to items variable
  formatParams(params) {
    const items = Object.keys(params).map((key) => `${key}=${params[key]}`);
    //  joins items with '&'
    return items.join('&');
  }
  render() {
    return (
      <main>
        <div>
          <form className='form-style' onSubmit={this.handleOnSubmit}>
            <label htmlFor='fName'>First name: </label>
            <br />
            <input
              type='text'
              id='fName'
              name='fName'
              value={this.state.fName}
              onChange={this.handleOnChange}
              required
            />{' '}
            <br />
            <br />
            <label htmlFor='lName'>Last name: </label>
            <br />
            <input
              type='text'
              id='lName'
              name='lName'
              value={this.state.lName}
              onChange={this.handleOnChange}
              required
            />{' '}
            <br />
            <br />
            <label htmlFor='email'>Email: </label>
            <br />
            <input
              type='text'
              id='email'
              name='email'
              value={this.state.email}
              onChange={this.handleOnChange}
              required
            />{' '}
            <br />
            <br />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </main>
    );
  }
}

export default App;
