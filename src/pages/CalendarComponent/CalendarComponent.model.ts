import {TaskList} from "../../store/TaskListStore/TaskList.model";
import {Moment} from "moment";

export type TaskListModel=Array<TaskList>
export type TaskModel=TaskList
export type CalendarMode = 'year' | 'month';
export interface TaskListByDateModel {
    selectedDate: Moment
    taskList: TaskListModel
    sortAt: 'plannedAt'|'createdAt'
    completedVisible: boolean
    activeVisible:boolean
}
export interface CalendarHeaderModel{
    value: Moment
    type:  CalendarMode
    onTypeChange: (type:  CalendarMode) => void
    setSelectedDate: (date: Moment)=>void
}