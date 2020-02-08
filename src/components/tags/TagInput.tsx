import React, {Component} from "react";
import {Tag} from "../../models/Tag";

import "./TagInput.scss";

interface IProps {
  initialTags?: Array<Tag>,
  handleTagChange: (tagsPassed: Array<Tag>) => void
}

interface IState {
  tags: Array<Tag>,
  tag_input: string,
  rendered: boolean
}

export default class TagInput extends Component<IProps> {

  state: IState = {
    tags: [],
    tag_input: "",
    rendered: false //to check if props.initialTags has been rendered
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.initialTags && this.props.initialTags !== prevProps.initialTags && !this.state.rendered) {
      this.setState({
        tags: this.props.initialTags,
        tag_input: "",
        rendered: true
      });
    }
  }

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ tag_input: event.target.value });
  }

  public handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      const value = (event.target as HTMLInputElement).value;
      this.setState({
        tags: 
        [...this.state.tags, {name: value}],
        tag_input: ""
      });
    }

    if (this.state.tags.length && event.keyCode === 8 && !this.state.tag_input.length) {
      this.setState({
        tags: this.state.tags.slice(0, this.state.tags.length - 1)
      });
    }
  }

  public handleRemoveItem = (index: number) => {
    return () => {
      this.setState({
        tags: this.state.tags.filter((item, i) => i !== index)
      });
      this.sendTags();
    }
  }

  public sendTags = (): void => {
    this.props.handleTagChange(this.state.tags);
  }

  public render() {
    return (
      <div>
        <label id = "tag-input-container">
          <ul id = "tag-input-ul">
            {this.state.tags.map((tagItem: Tag, i: number) =>
              <li key = {i} id = "tag-item"
                onMouseDown = {this.handleRemoveItem(i)}>
                {tagItem.name}
                <span> (x)</span>
              </li>
            )}
            <input
              id = "tag-input"
              placeholder = "enter to separate tags"
              value = {this.state.tag_input}
              onChange = {this.handleInputChange}
              onKeyDown = {this.handleInputKeyDown}
              onKeyUp = {this.sendTags}
              onMouseUp = {this.sendTags}
              />
            </ul>
        </label>
      </div>
    );
  }
}
