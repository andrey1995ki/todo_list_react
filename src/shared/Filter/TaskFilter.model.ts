import {TaskList} from '../../store/TaskListStore/TaskList.model'
import {Moment} from "moment";

export interface TaskFilterModel {
    completedVisible: boolean
    setCompletedVisible: (visible:boolean)=>void
    activeVisible:boolean
    setActiveVisible: (visible:boolean)=>void
    sort: sortType | sortCalendar
    setSort?: (sort:sortType)=>void
    setSortCalendar?:(sort:sortCalendar )=>void
    locationButton: 'task'|'calendar'|'taskByDay'
    taskInDayVisible?: TaskInDayVisible

}
export type FilterTaskList = Array<TaskList>
export type sortType = 'dateStartAsc'|"dateStartDesc"|'dateEndAsc'|"dateEndDesc"|"nameAsc"|"nameDesc"|"completed"|"active"
export type sortCalendar='plannedAt'|'createdAt'
export interface TaskInDayVisible {
    createdVisible:boolean
    setCreatedVisible: (visible:boolean)=>void
    plannedVisible:boolean
    setPlannedVisible: (visible:boolean)=>void
    selectedDate?: Moment
}