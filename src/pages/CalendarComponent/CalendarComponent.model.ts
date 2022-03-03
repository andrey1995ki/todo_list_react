import {TaskList} from "../../store/TaskListStore/TaskList.model";
import {Moment} from "moment";

export type TaskListModel=Array<TaskList>

export interface TaskListByDateModel {
    selectedDate: Moment
    taskList: TaskListModel
    sortAt: 'plannedAt'|'createdAt'|'all'
}