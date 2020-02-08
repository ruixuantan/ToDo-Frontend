import {Tag} from "./Tag";
import {Moment} from "moment";

export interface Task {
  id?: number,
  description: string,
  dateline: Moment,
  is_completed: boolean,
  tags: Array<Tag>
}