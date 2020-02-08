import React, {Component} from "react";
import axios from "axios";
import TagInput from "./TagInput";
import {Tag} from "../../models/Tag";

interface IState {
  tags: Array<Tag>
}

export default class CreateTag extends Component {

  state: IState = {
    tags: []
  }

  public handleTagChange = (tagsPassed: Array<Tag>): void => {
    this.setState({tags: tagsPassed});
  }

  public createTagRequest = (): void => {
    this.state.tags.map(tag =>
      axios.post("https://todo-list-backend-rails.herokuapp.com/api/v1/tags",
        tag,
        {withCredentials: true})
      .catch(errors => console.log("create tag", errors))
    )
    alert("Tag created successfully");
    window.location.href = "/tags";
  }

  public render() {
    return (
      <div>
        <h3>Add Tags</h3>
        <TagInput handleTagChange = {this.handleTagChange}/>
        <button
          className = "btn btn-primary"
          onClick = {this.createTagRequest}>
          Add
        </button>
      </div>
    );
  }
}
