import {SET_TASK_LIST, TOGGLE_LOADING} from "./TaskListStore";

export type Actions = SetTaskList | ToggleLoading

export interface InitialStateModel {
    taskList: TaskList | null
    loadingTaskList: boolean
}
export interface TaskList {
    taskName: string
    completed: boolean
    taskDescription: string
    createdAt: string
    plannedAt: string
    id: string
    subTask: Array<SubTaskList>

}
interface SubTaskList {
    completed: false
    description: string
    id: string
    taskListId: string
}

export interface SetTaskList {
    type: typeof SET_TASK_LIST
    taskList: TaskList
}
export interface ToggleLoading {
    type: typeof TOGGLE_LOADING
    loadingTaskList: boolean
}


