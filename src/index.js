import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './App';
import {MuiThemeProvider} from "@material-ui/core/styles/";
import beerTheme from './styles/beertheme';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);


ReactDOM.render(
  
  
  <React.StrictMode>
    <MuiThemeProvider theme={beerTheme}>
      <Provider store={store}>
       <App />
    </Provider>
    </MuiThemeProvider>
    
   </React.StrictMode>,
  document.getElementById('root')
);


