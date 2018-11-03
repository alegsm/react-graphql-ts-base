import * as React from 'react';
import {Component} from 'react';
import 'typeface-roboto';
import './App.css';
import {Route} from "react-router-dom";
import Login from "../Screens/Login";
import {Home} from "../Screens/Home";
import Register from "../Screens/Register";

class App extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/home" component={Home}/>
            </div>
        );
    }
}

export default App;
