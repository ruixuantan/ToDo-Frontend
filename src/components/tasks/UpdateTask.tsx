import React, {Component} from "react";
import {RouteComponentProps} from "react-router-dom";
import axios from "axios";
import moment, {Moment} from "moment";
import TaskDate from "./TaskDate";
import TagInput from "../tags/TagInput";
import {Task} from "../../models/Task";
import {Tag} from "../../models/Tag";
import {stringToDate} from "../utils/utils";

interface MatchParams {
  id: string
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

export default class UpdateTask extends Component<MatchProps> {

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
      });
  }

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ ...this.state,
      [event.target.name]: event.target.value 
    });
  }

  public handleDateChange = (date: string | Moment): void => {
    this.setState({dateline: date});
  }

  public toggleChange = (): void => {
    this.setState({is_completed: !this.state.is_completed});
  }

  public handleTagChange = (tagsPassed: Array<Tag>): void => {
    this.setState({tags: tagsPassed});
  }

  public updateTaskRequest = () => {
    const {match: {params: {id}}} = this.props;
    axios.put(`https://todo-list-backend-rails.herokuapp.com/api/v1/tasks/${id}`,
      this.state,
      {
        withCredentials: true,
        validateStatus: () => {return true;}
      })
    .then(() => {
      alert("Task updated successfully");
      window.location.href = "/dashboard";})
    .catch(error => {
      console.log("update errors", error);
    });
  }

  public render() {
    const {description, is_completed} = this.state;
    return (
      <div>
        <h3>Update Task</h3>
        <div className = "form-group">
          <label>Description:</label>
          <input
            className = "form-control"
            type = "text"
            name = "description"
            value = {description}
            onChange = {this.handleInputChange}
            />
        </div>
        <div className = "form-group">
          <label>Dateline:</label>
          <TaskDate
            dateline = {this.state.dateline}
            handleDateChange = {this.handleDateChange}
            />
        </div>
        <div className = "form-group">
          <label>Completed</label>
          <input
            type = "checkbox"
            name = "is_completed"
            value = {is_completed.toString()}
            checked = {this.state.is_completed}
            onChange = {this.toggleChange}
            />
        </div>
        <div className = "form-group">
          <label>Tags: </label>
          <TagInput
            initialTags = {this.state.tags}
            handleTagChange = {this.handleTagChange}
            />
        </div>
        <button
          className = "btn btn-primary"
          onClick = {this.updateTaskRequest}>
          Update
        </button>
      </div>
    );
  }
}
