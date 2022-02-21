import {
    SET_CREATED_TASK_RESULT,
    SET_SUB_TASK_LIST, SET_TASK,
    SET_TASK_LIST,
    TOGGLE_SUB_TASK_LOADING,
    TOGGLE_TASK_LIST_LOADING,
    TOGGLE_TASK_LOADING
} from "./TaskListStore";

export type Actions =
    SetTaskList
    & SetTask
    & ToggleTaskLoading
    & SetSubTaskList
    & ToggleSubTaskLoading
    & SetCreatedTaskResult
    & ToggleTaskListLoading

export type DispatchActions =
    SetTaskList
    | SetTask
    | ToggleTaskLoading
    | SetSubTaskList
    | ToggleSubTaskLoading
    | SetCreatedTaskResult
    | ToggleTaskListLoading

export interface InitialStateModel {
    taskList: Array<TaskList> | null
    loadingTaskList: boolean
    task: TaskList | null
    loadingTask: boolean
    subTaskList: Array<SubTaskList> | null
    loadingSubTaskList: boolean
    createdTaskResult: "success" | 'error' | null
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

export interface SubTaskList {
    completed: boolean
    description: string
    id: string
    taskListId: string
}

export interface SetTaskList {
    type: typeof SET_TASK_LIST
    taskList: Array<TaskList>
}

export interface SetTask {
    type: typeof SET_TASK
    task: TaskList
}

export interface SetSubTaskList {
    type: typeof SET_SUB_TASK_LIST
    subTaskList: Array<SubTaskList>
}

export interface SetCreatedTaskResult {
    type: typeof SET_CREATED_TASK_RESULT
    createdTaskResult: "success" | 'error' | null
}

export interface ToggleTaskListLoading {
    type: typeof TOGGLE_TASK_LIST_LOADING
    loadingTaskList: boolean
}

export interface ToggleTaskLoading {
    type: typeof TOGGLE_TASK_LOADING
    loadingTask: boolean
}

export interface ToggleSubTaskLoading {
    type: typeof TOGGLE_SUB_TASK_LOADING
    loadingSubTaskList: boolean
}


