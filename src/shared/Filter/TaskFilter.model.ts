import {TaskList} from '../../store/TaskListStore/TaskList.model'

export interface TaskFilterModel {
    completedVisible: boolean
    setCompletedVisible: (visible:boolean)=>void
    activeVisible:boolean
    setActiveVisible: (visible:boolean)=>void
    sort: sortType | sortCalendar
    setSort?: (sort:sortType)=>void
    setSortCalendar?:(sort:sortCalendar )=>void
    locationButton: 'task'|'calendar'|'taskByDay'
}
export type FilterTaskList = Array<TaskList>
export type sortType = 'dateStartAsc'|"dateStartDesc"|'dateEndAsc'|"dateEndDesc"|"nameAsc"|"nameDesc"|"completed"|"active"
export type sortCalendar='plannedAt'|'createdAt'
