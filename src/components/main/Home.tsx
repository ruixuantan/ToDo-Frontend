import React, {Component} from "react";
import Registration from "../auth/Registration";
import Login from "../auth/Login";
import {UserData} from "../../models/UserData";

interface IProps {
  handleLogin: (data: UserData) => void,
  handleLogout: () => void,
  loggedInStatus: string
}

export default class Home extends Component<IProps>{

  public handleSuccessfulAuth = (data: UserData): void => {
    this.props.handleLogin(data);
  }

  public render () {
    return (
      <div className = "container">
        <Login handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
        <br />
        <p>Don't have an account? Register&nbsp;
          <button type = "button"
            data-toggle = "modal" data-target = "#register-modal"
            id = "register-link">
            here
          </button>
        </p>

        <div className = "modal" id = "register-modal">
          <Registration handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
        </div>
      </div>
    );
  }
}
