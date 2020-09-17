import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Switch} from 'react-router';
import Beers from './components/Beers';
import BeerPage from './components/BeerPage';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import PrivateRoute from './components/PrivateRoute';

function App() {
 
  return (
   
    <Router>
       
        <Switch>
        <Route exact path='/login' component={Login} />
         {/* <Route exact path='/' component={Beers} /> */}
         <Route exact path='/create-post' component={CreatePost} />
         <Route exact path="/beer/:id,:author" component={BeerPage} />
         <PrivateRoute exact path='/' component={Beers} />
        
        </Switch>
    </Router>
   
  );
}

export default App;
