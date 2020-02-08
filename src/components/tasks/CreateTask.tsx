import React, {Component} from "react";
import axios from "axios";
import moment, {Moment} from "moment";
import TagInput from "../tags/TagInput";
import TaskDate from "./TaskDate";
import {Task} from "../../models/Task";
import {Tag} from "../../models/Tag";

export default class CreateTask extends Component {

  state: Task = {
    description: "",
    dateline: moment(),
    is_completed: false,
    tags: []
  }

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({...this.state, 
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

  public createTaskRequest = () => {
    axios.post("https://todo-list-backend-rails.herokuapp.com/api/v1/tasks", 
      {
        description: this.state.description,
        dateline: this.state.dateline,
        is_completed: this.state.is_completed,
        tags_attributes: this.state.tags
      },
      {
        withCredentials: true, 
        validateStatus: () => {return true;}
      })
    .then(() => {
      alert("Task created successfully");
      window.location.href = "/dashboard";
    })
    .catch(error => {
      console.log("create errors", error);
    });;
  }

  public render() {
    const {description, dateline, is_completed} = this.state;
    return (
      <div className = "modal-body">
        <div className = "modal-dialog">
          <div className = "modal-content">

            {/*Modal Header*/}
            <div className = "modal-header">
              <h6 className = "modal-title">Add Task</h6>
              <button type = "button" className = "close" data-dismiss = "modal">
                &times;
              </button>
            </div>

            {/*Modal Body*/}
            <div className = "modal-body">
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
                  dateline = {dateline}
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
                <label>Tags:</label>
                <TagInput handleTagChange = {this.handleTagChange}/>
              </div>

              {/*Modal Footer*/}
              <div className = "modal-footer">
                <button type = "button" className = "btn btn-danger"
                  data-dismiss = "modal">
                  Close
                </button>
                <button
                  className = "btn btn-primary" onClick = {this.createTaskRequest}>
                  Add
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
