import React, {Component} from "react";
import Tasks from "../tasks/TaskIndex";
import CreateTask from "../tasks/CreateTask";

export default class Dashboard extends Component {

  public render () {
    return (
      <div>
        <br />
        <button type = "button" className = "btn btn-primary"
          data-toggle = "modal" data-target = "#addtask-modal">
          + Add Task
        </button>

        <div className = "modal" id = "addtask-modal">
          <CreateTask />
        </div>

        <br />
        <br />
        <Tasks />
      </div>
    );
  };
}
