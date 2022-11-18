import './App.css';
import React  from 'react';
import Principal from './componentes/principal/principal';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import {Home} from './componentes/country/Home';
import {Activities} from './componentes/activities/activitiesForm/Activities'
import {Details} from './componentes/details/Details'
import {CardsActivities} from "./componentes/activities/activitiesCards/CardsActivities"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" render={()=><Principal/>}/>
          <Route exact path="/home"  component={Home}/>
          <Route path="/Activities" component={Activities}/> 
          <Route  path="/home/:id" component={Details}/>
          <Route path="/AllActivities"  component={CardsActivities}/>
        </Switch>
      </div> 
    </BrowserRouter>
  );
}

export default App;
