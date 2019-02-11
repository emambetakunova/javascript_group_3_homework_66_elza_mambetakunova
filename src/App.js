import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import EditorForm from "./components/EditorForm/EditorForm";

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/pages/admin" component={EditorForm}/>
                    <Route path="/pages/:id" component={Home}/>
                </Switch>
            </Layout>
        );
    }
}

export default App;
