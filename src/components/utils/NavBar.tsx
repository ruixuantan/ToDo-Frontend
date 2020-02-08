import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

interface IProps {
  handleLogout: () => void
}

export default class NavBar extends Component <IProps> {

  public handleLogoutClick = (): void => {
    axios.delete("https://todo-list-backend-rails.herokuapp.com/logout", {withCredentials: true})
      .then(() => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout errors", error);
      });
  }

  public render() {
    return (
      <nav className = "navbar fixed-top">
         <Link className = "nav-link" to = "/dashboard">Home</Link>
         <Link className = "nav-link" to = "/tags">Manage Tags</Link>
        <ul className = "navbar-nav navbar-right">
          <li><button
            className = "btn btn-outline-primary"
            onClick = {() => this.handleLogoutClick()}>
            Logout
          </button></li>
        </ul>
      </nav>
    );
  }
}
