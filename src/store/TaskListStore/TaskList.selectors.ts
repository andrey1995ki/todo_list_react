import { createSelector } from "reselect";
import {RootReducer} from "../store";

const getTaskListSelector = (state:RootReducer) =>{
    return state.taskList.taskList
}
export const getTaskList = createSelector( getTaskListSelector, (taskList) => {
    return taskList;
})

const toggleLoadingSelector = (state:RootReducer) =>{
    return state.taskList.loadingTaskList
}
export const toggleLoading = createSelector(toggleLoadingSelector, (loadingTaskList) =>{
    return loadingTaskList
})

const getTaskSelector = (state:RootReducer) =>{
    return state.taskList.task
}
export const getTask = createSelector( getTaskSelector, (task) => {
    return task;
})

const toggleLoadingTaskSelector = (state:RootReducer) =>{
    return state.taskList.loadingTask
}
export const toggleLoadingTask = createSelector(toggleLoadingTaskSelector, (loadingTask) =>{
    return loadingTask
})

const getSubTaskListSelector = (state:RootReducer) =>{
    return state.taskList.subTaskList
}
export const getSubTaskList = createSelector( getSubTaskListSelector, (subTask) => {
    return subTask;
})

const toggleLoadingSubTaskSelector = (state:RootReducer) =>{
    return state.taskList.loadingSubTaskList
}
export const toggleSubTaskLoading = createSelector(toggleLoadingSubTaskSelector, (loadingSubTaskList) =>{
    return loadingSubTaskList
})
const getCreatedTaskResultSelector =(state:RootReducer)=>{
    return state.taskList.createdTaskResult
}
export const getCreatedTaskResult = createSelector(getCreatedTaskResultSelector,(createdTaskResult)=>{
    return createdTaskResult
})