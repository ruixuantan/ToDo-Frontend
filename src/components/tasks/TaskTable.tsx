import React, {Component} from "react";
import {Link} from "react-router-dom";
import {stringifyTags, dateToString} from "../utils/utils";
import {Task} from "../../models/Task"

interface IProps {
  all_tasks: Array<Task>,
  handleDelete: (taskId: number) => void
}

export default class TaskTable extends Component<IProps> {
  public render() {
    const tasks: Array<Task> = this.props.all_tasks;
    return (
      <div>
        <table className = "table table-striped">
          <thead className = "thead-dark">
            <tr>
              <th>Task</th>
              <th>Dateline</th>
              <th>Completed?</th>
              <th>Actions</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
          {
            tasks.map((task: Task) => {
              return (
                <tr key = {task.id}>
                  <td>
                    <Link to = {`/tasks/${task.id}`}>
                      {task.description}
                    </Link>
                  </td>
                  <td>{dateToString(task.dateline)}</td>
                  <td>{task.is_completed ? "Done" : "Pending"}</td>
                  <td>
                    <Link to = {`/tasks/${task.id}/edit`}
                    className = "btn btn-info">
                      Edit
                    </Link>
                    <button
                      className = "btn btn-danger"
                      onClick = {() => task.id ? this.props.handleDelete(task.id) : null}>
                      Delete
                    </button>
                  </td>
                  <td>
                    {stringifyTags(task.tags)}
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}
