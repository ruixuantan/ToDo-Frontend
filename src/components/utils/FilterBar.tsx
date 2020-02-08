import React, {Component} from "react";

interface IProps {
  handleFilter: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default class FilterBar extends Component<IProps>{

  public render() {
    return (
      <div>
        <h3>FilterBar</h3>
        <input
           onChange = {this.props.handleFilter}
           type = "text"
           placeholder = "enter a tag to filter"
           />
      </div>
    );
  }
}
