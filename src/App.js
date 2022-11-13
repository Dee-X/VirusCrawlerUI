import './App.css';
import {Button, TextField, Typography, Box, CircularProgress, Tooltip} from '@mui/material/';
import React, {useState} from 'react';
import authContext from "./authContext";
import { ProgramHeader } from './ProgramHeader';

import { createTheme, ThemeProvider } from '@mui/material/';
import {useTransition, animated} from 'react-spring';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const font =  "'Roboto Condensed', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font
  },
  palette: {
    vcPurple: createColor('#A26CF4'),
    vcDarkPurple: createColor('#7941FB'),
    vcGray: createColor('#442f65'),
    vsOffWhite: createColor('#F5F5F5')
  }
});
//import Login from "./Login";

export const eel = window.eel
eel.set_host( 'ws://localhost:8080' )

function show_log(msg) {
  console.log(msg)
}
window.eel.expose(show_log, 'show_log')

const styles = theme => ({
  textField: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',            
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500
  },
  input: {
      color: '#F5F5F5'
  }
});

function GoodResult() {
  return(
    <div>
      SAFE
    </div>
  );
}

function BadResult() {
  return(
    <div>
      <b>NOT</b> SAFE
    </div>
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState();
  const [authenticated2, setAuthenticated2] = useState(true);
  const [test, setTest] = useState();
  const [allowUpload, setAllowUpload] = useState(false);
  const [moreResults, setMoreResults] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [header, ] = useState(true);
  const classes = styles();

  const transition = useTransition(authenticated2, {
    from: {x: -100, y: -800, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: 100, y: 800, opacity: 0},
    trail: 150
  })

  const transition2 = useTransition(allowUpload, {
    from: {x: -100, y: 800, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: -100, y: 800, opacity: 0},
    trail: 250,
    exitBeforeEnter: true
  })

  const transition3 = useTransition(header, {
    from: {x: -100, y: -800, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    trail: 150
  })

  const transition4 = useTransition(showStatus, {
    from: {x: -100, y: 800, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: -100, y: 800, opacity: 0},
    trail: 250,
    exitBeforeEnter: true
  })

  const transition5 = useTransition(moreResults, {
    from: {x: -100, y: 800, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: -100, y: 800, opacity: 0},
    trail: 250,
    exitBeforeEnter: true
  })

  async function btnHandler() {
    setAllowUpload(false);
    setShowStatus(true);
    setTest({'processing' : true})
    var test = await eel.doWork(authenticated.name)();
    // setAuthenticated(test);
    setTest(test);
    console.log(test);
  }

  const fileOnChange = (event) => {
    const files = Array.from(event.target.files);
    const [file] = files;
    setAuthenticated(file);
    console.log(file);
  }

  let result;
  // if (showStatus) {
  //     console.log(test);
    if (test){
      if (test.result === true){
        result = (<div><BadResult /> <span><Button variant="contained" color="vcDarkPurple" onClick={() => {setMoreResults(true);setShowStatus(false);}} size='large'>Show Advanced Results</Button>&nbsp;&nbsp;&nbsp;<Button variant="contained" color="vcDarkPurple" onClick={() => {setShowStatus(false);setAllowUpload(true);setTest(null);}} size='large'>Scan A Different PDF</Button></span></div>)
      } else if (test.processing) {
        result = <Box sx={{ width: '100%' }}>
                  <br/> <CircularProgress color="vcDarkPurple" />
                </Box>
      } else if (test.result === false){
        result = <div><GoodResult /><span><Button variant="contained" color="vcDarkPurple" onClick={() => {setMoreResults(true);setShowStatus(false);}} size='large'>Show Advanced Results</Button>&nbsp;&nbsp;&nbsp;<Button variant="contained" color="vcDarkPurple" onClick={() => {setShowStatus(false);setAllowUpload(true);setTest(null);}} size='large'>Scan A Different PDF</Button></span></div>
      } else {
        result = ''
      }
    }
  // } else {
  //   result = null
  // }

  let start;
  // if (authenticated2) {
    start = (<div className='App-body'>
              <Button variant="contained" color="vcDarkPurple" onClick={() => {setAuthenticated2(false); setAllowUpload(true);}} size='large'>Begin</Button>
            </div>);
  // } else {
  //   start = null;
  // }

  let fileUpload;
  // if (allowUpload) {
    fileUpload = (<div className='App-body'>
    <span>
      <TextField type='file' name='testFile' style={{
        borderRadius: 25,
        backgroundColor: '#F5F5F5'
      }}
      InputProps={{
        style: {
          color: "black"
        },
        accept: "application/pdf"
      }} onChange={fileOnChange}/>
      &nbsp;&nbsp;&nbsp;
      <Button variant="contained" color="vcDarkPurple" onClick={btnHandler} disabled={!authenticated} size='large'>Scan</Button>
    </span>   
  </div>);
  // } else {
  //   fileUpload = null;
  // }

  let showResult;
  // if (test) {
    showResult = (<div className='App-body'>
    Result: <Typography variant="h4">{result}</Typography>
  </div>);
  // } 
  //   showResult = null;
  // }

  let advancedResults;
  
    advancedResults = (<div className='App-body'>
       {test && <><Tooltip title="test1"><Typography variant='h5'>Signature 1: {test.sig_one ? "Failed" : "Passed"} <br /></Typography></Tooltip><Tooltip title="test1"><Typography variant='h5'>Signature 2: {test.sig_two ? "Failed" : "Passed"} <br /></Typography></Tooltip><Tooltip title="test1"><Typography variant='h5'>Signature 3: {test.sig_three ? "Failed" : "Passed"} <br /></Typography></Tooltip><br /><Tooltip title="test1"><Typography variant='h5'>Signature 1: {test.sig_four ? "Failed" : "Passed"} <br /></Typography></Tooltip></>}
        <Button variant="contained" color="vcDarkPurple" onClick={() => {setMoreResults(false);setAllowUpload(true);setTest(null);}} size='large'>Scan A Different PDF</Button>
    </div>)
  
  //   advancedResults = null;
  // }

  return (
    <ThemeProvider theme={theme}>
      <authContext.Provider value={{ authenticated, setAuthenticated, authenticated2, setAuthenticated2, test, setTest}}>
        <div className="App">
          <header className="App-header">
            {/* <ProgramHeader /> */}
            <div>
            {
              transition3((style, item) => item ? <animated.div variant='h1' style={style}><ProgramHeader /></animated.div>: "")
            }
          </div>
          </header>
          <body>

          <div>
            {
              transition((style, item) => item ? <animated.div variant='h1' style={style}>{start}</animated.div>: "")
            }
          </div>
          <div>
            {
              transition2((style, item) => item ? <animated.div style={style}>{fileUpload}</animated.div>: "")
            }
          </div>
          <div>
            {
              transition4((style, item) => item ? <animated.div style={style}>{showResult}</animated.div>: "")
            }
          </div>
          <div>
            {
              transition5((style, item) => item ? <animated.div style={style}>{advancedResults}</animated.div>: "")
            }
          </div>
          </body>
        </div>
      </authContext.Provider>
    </ThemeProvider>
  );
}

export default App;
