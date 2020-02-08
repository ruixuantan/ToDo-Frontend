import React, {Component} from "react";
import axios from "axios";
import FilterBar from "../utils/FilterBar";
import TaskTable from "./TaskTable";
import {Task} from "../../models/Task";
import {stringToDate} from "../utils/utils";

interface IProps {
  tasks: Array<Task>
  searchTag: string
}

export default class Tasks extends Component {

  state: IProps = {
    tasks: [],
    searchTag: ""
  }

  public componentDidMount() {
    this.fetchTasksList();
  }

  public fetchTasksList = (): void => {
    axios.get("https://todo-list-backend-rails.herokuapp.com/api/v1/tasks", {withCredentials: true})
      .then((response) => {
        const responseStore = response.data;
        for (let i = 0; i < responseStore.length; ++i) {
          responseStore[i].dateline = stringToDate(responseStore[i].dateline);
        }
        this.setState({tasks: responseStore});
      });
  };

  public handleDelete = (taskId: number): void => {
    axios.delete(`https://todo-list-backend-rails.herokuapp.com/api/v1/tasks/${taskId}`)
       .then(() => {
         alert("Task deleted successfully")
         this.fetchTasksList();
    });
  }

  public handleFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({searchTag: event.target.value})
  }

  public render() {
    //filter tasks for tags that contains a name equal to searchTag
    let filteredTags = this.state.tasks.filter((task: Task) => {
      if (this.state.searchTag === "") {
        return true;
      } else {
        for (let i: number = 0; i < task.tags.length; i++) {
          if (task.tags[i].name.includes(this.state.searchTag.toLowerCase())) {
            return true;
          }
        }
      }
    });

    return (
      <div>
        <FilterBar handleFilter = {this.handleFilter}/>
        <br />
        <h3>All Tasks</h3>
        <TaskTable
          all_tasks = {filteredTags}
          handleDelete = {this.handleDelete}
          />
      </div>
    );
  }
}
