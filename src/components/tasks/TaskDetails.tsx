import React, {Component} from "react";
import {RouteComponentProps} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {stringifyTags, dateToString, stringToDate} from "../utils/utils";
import {Task} from "../../models/Task";

interface MatchParams {
  id: string
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

export default class TaskDetails extends Component <MatchProps>{

  state: Task = {
    description: "",
    dateline: moment(),
    is_completed: false,
    tags: []
  }

  public componentDidMount() {
    const {match: {params: {id}}} = this.props;
    axios.get(`https://todo-list-backend-rails.herokuapp.com/api/v1/tasks/${id}`)
      .then((response) => {
        this.setState({
          description: response.data.description,
          dateline: stringToDate(response.data.dateline),
          is_completed: response.data.is_completed,
          tags: response.data.tags
        });
    })
  }

  public render() {
    return (
      <div>
        <div>
          <h5>Description</h5>
          <p>{this.state.description}</p>
        </div>

        <div>
          <h5>Dateline</h5>
          <p>{dateToString(this.state.dateline)}</p>
        </div>

        <div>
          <h5>Completed?</h5>
          <p>{this.state.is_completed ? "Done" : "Pending"}</p>
        </div>

        <div>
          <h5>Tags</h5>
          <p>{stringifyTags(this.state.tags)}</p>
        </div>
      </div>
    );
  }
}
