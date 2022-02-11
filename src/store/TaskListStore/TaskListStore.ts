import {InitialStateModel, SetTaskList, TaskList, ToggleLoading} from "./TaskList.model";
import {taskAPI} from "../../shared/API";
import {Dispatch} from "redux";

const prefix = 'taskLost'

export const SET_TASK_LIST=`${prefix}/SET_TASK_LIST`
export const TOGGLE_LOADING = `${prefix}/TOGGLE_LOADING`

const initialState:InitialStateModel ={
    taskList: null,
    loadingTaskList: false
}

export const TaskListReducer = (state =initialState, action: SetTaskList & ToggleLoading):InitialStateModel=>{
    switch (action.type) {
        case SET_TASK_LIST:
            return {
                ...state,
                taskList: action.taskList
            }
        case TOGGLE_LOADING:
            return {
                ...state,
                loadingTaskList:action.loadingTaskList
            }
        default:
            return state
    }
}

export const setTaskList = (taskList:TaskList):SetTaskList=>({type:SET_TASK_LIST, taskList})
export const toggleLoading = (loadingTaskList:boolean):ToggleLoading=>({type:TOGGLE_LOADING,loadingTaskList})

export const receiveTaskList =()=>async (dispatch:Dispatch<SetTaskList | ToggleLoading>)=>{
    dispatch(toggleLoading(true))
    try {
        const response = await taskAPI.getTaskList()
        dispatch(setTaskList(response.data))
        dispatch(toggleLoading(false))
        console.log(response.data)
    }
    catch (e) {
        dispatch(toggleLoading(false))
        console.log(e)
    }
}