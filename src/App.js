import logo from './logo.svg';
import './App.css';
import {Button} from '@mui/material/';
import React, {useState} from 'react';
import authContext from "./authContext";
//import Login from "./Login";

export const eel = window.eel
eel.set_host( 'ws://localhost:8080' )

// Expose the `sayHelloJS` function to Python as `say_hello_js`
function sayHelloJS( x) {
  console.log( 'Hello from ' + x )
}
// WARN: must use window.eel to keep parse-able eel.expose{...}
window.eel.expose( sayHelloJS, 'say_hello_js' )

// Test anonymous function when minimized. See https://github.com/samuelhwilliams/Eel/issues/363
function show_log(msg) {
  console.log(msg)
}
window.eel.expose(show_log, 'show_log')

// Test calling sayHelloJS, then call the corresponding Python function

function App() {
  const [authenticated, setAuthenticated] = useState(-1);
  const [authenticated2, setAuthenticated2] = useState({'login' : 'true'});
  const [test, setTest] = useState(1000);


  async function btnHandler() {
    var test = await eel.test('sample.pdf')();
    // setAuthenticated(test);
    setTest(test)
  }

  return (
    <authContext.Provider value={{ authenticated, setAuthenticated, authenticated2, setAuthenticated2, test, setTest}}>
      <div className="App">
        <header className="App-header">
          <h1>Virus Crawler</h1>
          <p>{authenticated}</p>
          <p>{test}</p>
          <Button variant="contained" onClick={btnHandler}>Click</Button>
          {/* <Button variant="contained" onClick={() => {console.log(authenticated)}}>Click</Button> */}
          {/* <Login /> */}
        </header>
        <body className='App-header'>
          
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
        </body>
      </div>
    </authContext.Provider>
  );
}

export default App;
