import { createSelector } from "reselect";

const getTaskListSelector = (state:any) =>{
    return state.taskList.taskList
}
export const getTaskList = createSelector( getTaskListSelector, (taskList) => {
    return taskList;
})

const toggleLoadingSelector = (state:any) =>{
    return state.taskList.loadingTaskList
}
export const toggleLoading = createSelector(toggleLoadingSelector, (loadingTaskList) =>{
    return loadingTaskList
})