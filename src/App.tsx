import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import axios from "axios";

import Home from "./components/main/Home";
import Dashboard from "./components/main/Dashboard";
import NavBar from "./components/utils/NavBar";
import Tasks from "./components/tasks/TaskIndex";
import UpdateTask from "./components/tasks/UpdateTask";
import TaskDetails from "./components/tasks/TaskDetails";
import TagIndex from "./components/tags/TagIndex";
import {User, UserData} from "./models/UserData";

import "./App.scss";

interface IState {
  loggedInStatus: string,
  user: User
}

export default class App extends Component {

  state: IState = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: {
      id: 0,
      email: ""
    }
  }

  public checkLoginStatus = (): void => {
    axios.get("https://todo-list-backend-rails.herokuapp.com/logged_in", {withCredentials: true})
      .then(response => {
        if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          });
        } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("error", error);
      })
  }

  public componentDidMount(): void {
    this.checkLoginStatus();
  }

  public handleLogin = (data: UserData): void => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
    window.location.href = "/dashboard";
  }

  public handleLogout = (): void => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
    window.location.href = "/";
  }

  public render() {
    return (
      <div>
        <div className = "jumbotron" id = "app-header">
          <h1>To-Do List</h1>
        </div>
        <BrowserRouter>
        {this.state.loggedInStatus === "LOGGED_IN"
            ? <NavBar handleLogout = {this.handleLogout}/>
            : null}
          <Switch>
            <Route
              path = "/"
              exact
              render = {props => (
                <Home {...props}
                  handleLogin = {this.handleLogin}
                  handleLogout = {this.handleLogout}
                  loggedInStatus = {this.state.loggedInStatus}
                  />
              )}
              />
            <Route
              path = "/dashboard"
              exact
              component = {Dashboard}
              />
            <Route exact path = "/dashboard">
              <Tasks />
            </Route>
            <Route
              path = "/tasks/:id/edit"
              exact
              component = {UpdateTask}
              />
            <Route
              path = "/tasks/:id"
              exact
              component = {TaskDetails}
             />
             <Route
               path = "/tags"
               exact
               component = {TagIndex}
              />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
