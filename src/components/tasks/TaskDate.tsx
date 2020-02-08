import React, {Component} from "react";
import DateTime from "react-datetime";
import {Moment} from "moment";

import "./Datetime.scss";

interface IProps {
  dateline: Moment,
  handleDateChange: (value: string | Moment) => void
}

export default class TaskDate extends Component<IProps> {
  public render() {
    return (
      <DateTime
        value = {this.props.dateline}
        timeFormat = {false}
        closeOnSelect = {true}
        onChange = {this.props.handleDateChange}/>
    );
  }
}
