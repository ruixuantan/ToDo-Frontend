import React, {Component} from "react";
import axios from "axios";
import CreateTag from "./CreateTag";
import FilterBar from "../utils/FilterBar";
import {Tag} from "../../models/Tag";

interface IState {
  tags: Array<Tag>,
  searchTag: string
}

export default class TagIndex extends Component {

  state: IState = {
    tags: [],
    searchTag: ""
  }

  public componentDidMount() {
    this.fetchTagsList();
  }

  public fetchTagsList = (): void => {
    axios.get("https://todo-list-backend-rails.herokuapp.com/api/v1/tags", {withCredentials: true})
      .then((response) => 
        this.setState({tags: response.data}))
      .catch(errors => console.log(errors));
  };

  public handleDelete = (tagId: number | undefined): void => {
    axios.delete(`https://todo-list-backend-rails.herokuapp.com/api/v1/tags/${tagId}`)
     .then(() => {
       alert("Tag deleted successfully")
       this.fetchTagsList();
     });
   }

  public handleDeleteAll = (tagIds: Array<Tag>): void => {
    tagIds.map((tagId) => {
      axios.delete(`https://todo-list-backend-rails.herokuapp.com/api/v1/tags/${tagId.id}`)
        .then(() => {
          this.fetchTagsList();
        });
    })
  }

  public handleFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({searchTag: event.target.value})
  }

  public render() {
    let tags: Array<Tag> = this.state.tags.filter((tag: Tag | null) => {
      return tag == null 
        ? null
        : tag.name.includes(this.state.searchTag.toLowerCase())
    })

    return (
      <div>
        <br />
        <CreateTag />
        <br />
        <FilterBar handleFilter = {this.handleFilter}/>
        <br />
        <div className = "row">
          <h3 className = "col-3">All Tags</h3>
          <button
            className = "col-2 btn btn-danger"
            onClick = {() => this.handleDeleteAll(tags)}>
            Delete all filtered Tags
          </button>
        </div>
        <br />
        <table className = "table table-striped" id = "tag-index">
          <thead className = "thead-dark">
            <tr>
              <th className = "col-2">Tag</th>
	            <th className = "col-1">Delete</th>
            </tr>
          </thead>
          <tbody>
          {
            tags.map((tag) => {
              return (
                <tr key={tag.id}>
                  <td>{tag.name}</td>
                  <td>
                    <button
                      className = "btn btn-danger"
                      onClick = {() => this.handleDelete(tag.id)}>
                      Delete
                    </button>
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
