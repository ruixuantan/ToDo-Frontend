import {Tag} from "../../models/Tag";
import moment, {Moment} from "moment";

//convert date string from Rails API to moments object
export const stringToDate = (date: string): Moment => {
  return date === null
    ? moment()
    : moment(date);
}

//convert date string from react for Rails API
export const dateToString = (date: Moment): string => {
  return date === null
    ? "NIL"
    : date.format("MMM Do YYYY");
}

//convert tags objects from Rails API to one string on frontend
export const stringifyTags = (tagArray: Array<Tag>): string => {
  return !tagArray
    ? "no taggings"
    : tagArray.map(tag => " " + tag.name).toString();
}


