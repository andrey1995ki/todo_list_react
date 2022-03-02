import {TaskList} from '../../store/TaskListStore/TaskList.model'

export interface TaskFilterModel {
    completedVisible: boolean
    setCompletedVisible: (visible:boolean)=>void
    activeVisible:boolean
    setActiveVisible: (visible:boolean)=>void
    sort: sortType
    setSort: (sort:sortType)=>void
}
export type FilterTaskList = Array<TaskList>
export type sortType = 'dateStartAsc'|"dateStartDesc"|'dateEndAsc'|"dateEndDesc"|"nameAsc"|"nameDesc"|"completed"|"active"