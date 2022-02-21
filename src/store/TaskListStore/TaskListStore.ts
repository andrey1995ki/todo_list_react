import {
    Actions,
    InitialStateModel,
    SetSubTaskList,
    SetTaskList,
    SubTaskList,
    TaskList,
    ToggleTaskLoading, ToggleSubTaskLoading, SetCreatedTaskResult, ToggleTaskListLoading, DispatchActions, SetTask
} from "./TaskList.model";
import {taskAPI} from "../../shared/API";
import {Dispatch} from "redux";
import {todoList} from "../localData/todoList";

const prefix = 'taskLost'

export const SET_TASK_LIST=`${prefix}/SET_TASK_LIST`
export const SET_TASK=`${prefix}/SET_TASK`
export const SET_SUB_TASK_LIST=`${prefix}/SET_SUB_TASK_LIST`
export const SET_CREATED_TASK_RESULT=`${prefix}/SET_CREATED_TASK_RESULT`
export const TOGGLE_TASK_LIST_LOADING = `${prefix}/TOGGLE_TASK_LIST_LOADING`
export const TOGGLE_TASK_LOADING = `${prefix}/TOGGLE_TASK_LOADING`
export const TOGGLE_SUB_TASK_LOADING = `${prefix}/TOGGLE_SUB_TASK_LOADING`

const initialState:InitialStateModel ={
    taskList: null,
    loadingTaskList: false,
    task: null,
    loadingTask: false,
    subTaskList: null,
    loadingSubTaskList: false,
    createdTaskResult:null,
}

export const TaskListReducer = (state =initialState, action: Actions):InitialStateModel=>{
    switch (action.type) {
        case SET_TASK_LIST:
            return {
                ...state,
                taskList: action.taskList
            }
        case SET_TASK:
            return {
                ...state,
                task: action.task
            }
        case SET_SUB_TASK_LIST:
            return {
                ...state,
                subTaskList: action.subTaskList
            }
        case TOGGLE_TASK_LIST_LOADING:
            return {
                ...state,
                loadingTaskList:action.loadingTaskList
            }
        case TOGGLE_TASK_LOADING:
            return {
                ...state,
                loadingTask:action.loadingTask
            }
        case TOGGLE_SUB_TASK_LOADING:
            return {
                ...state,
                loadingSubTaskList: action.loadingSubTaskList
            }
        case SET_CREATED_TASK_RESULT:
            return {
                ...state,
                createdTaskResult: action.createdTaskResult
            }
        default:
            return state
    }
}

export const setTaskList = (taskList:Array<TaskList>):SetTaskList=>({type:SET_TASK_LIST, taskList})
export const setTask =(task:TaskList):SetTask=>({type:SET_TASK,task})
export const setSubTaskList = (subTaskList:Array<SubTaskList>):SetSubTaskList=>({type:SET_SUB_TASK_LIST, subTaskList})
export const setCreatedTaskResult = (createdTaskResult:"success" |'error'|null):SetCreatedTaskResult=>({type:SET_CREATED_TASK_RESULT, createdTaskResult})
export const toggleTaskListLoading = (loadingTaskList:boolean):ToggleTaskListLoading=>({type:TOGGLE_TASK_LIST_LOADING,loadingTaskList})
export const toggleTaskLoading = (loadingTask:boolean):ToggleTaskLoading=>({type:TOGGLE_TASK_LOADING,loadingTask})
export const toggleSubTaskLoading = (loadingSubTaskList:boolean):ToggleSubTaskLoading=>({type:TOGGLE_SUB_TASK_LOADING,loadingSubTaskList})

export const receiveTaskList =()=>async (dispatch:Dispatch<DispatchActions>)=>{
    dispatch(toggleTaskListLoading(true))
    try {
        const response = await taskAPI.getTaskList()
        dispatch(setTaskList(response.data))
        dispatch(toggleTaskListLoading(false))
    }
    catch (e:any) {
        dispatch(toggleTaskListLoading(false))
        console.log(e)
        dispatch(setTaskList(todoList))
    }
}
export const receiveTask =(id:string)=>async (dispatch:Dispatch<DispatchActions>)=>{
    dispatch(toggleTaskLoading(true))
    try {
        const response = await taskAPI.getTask(id)
        dispatch(setTask(response.data))
    }
    catch (e:any) {
        console.log(e)
    }
    dispatch(toggleTaskLoading(false))
}
export const receiveSubTaskList =(taskId:string="0")=>async (dispatch:Dispatch<DispatchActions>)=>{
    dispatch(toggleSubTaskLoading(true))
    try {
        const response = await taskAPI.getSubTaskList(taskId)
        dispatch(setSubTaskList(response.data))
        dispatch(toggleSubTaskLoading(false))
    }
    catch (e) {
        dispatch(toggleSubTaskLoading(false))
        console.log(e)

    }
}
//TODO избавиться от any
export const addSubTask=(description:string,taskId:string="0",updateSubTask:boolean)=>async(dispatch:Dispatch<any>)=>{
    try {
        const response = await taskAPI.addSubTask(description,taskId)
        if (updateSubTask){
            await dispatch(receiveSubTaskList(taskId))
        }
        console.log(response.data)
    }
    catch (e) {
        console.log(e)
    }
}

export const createdTask=(taskName:string,taskDescription: string,createdAt: string,plannedAt: string,subTask:[])=>async(dispatch:Dispatch<any>)=>{
    try {
        const response:any=await taskAPI.createTask(taskName,taskDescription,createdAt,plannedAt)
        console.log(response.data)
        let id = response.data?.id
        for(let task in subTask){
           await dispatch(addSubTask(subTask[task]["description"],id,false))
        }
        dispatch(setCreatedTaskResult('success'))
    }
    catch (e){
        dispatch(setCreatedTaskResult('error'))
    }
}
export const updateSubTask=(parameter:any,taskId:string='0',subTaskId:string)=>async(dispatch:Dispatch<any>)=>{
    try {
        const response = await taskAPI.updateSubTask(parameter,taskId,subTaskId)
        dispatch(receiveSubTaskList(taskId))
        console.log(response.data);
    }
    catch (e) {
        console.log(e)
    }
}
export const deleteSubTasK=(taskId:string='0',subTaskId:string)=>async (dispatch:Dispatch<any>)=>{
    try {
        const response = await taskAPI.deleteSubTask(taskId,subTaskId)
        console.log(response.data);
        dispatch(receiveSubTaskList(taskId))
    }
    catch (e) {
        console.log(e)
    }
}
export const updateTask=(parameter:any,taskId:string='0')=>async(dispatch:Dispatch<any>)=>{
    try {
        const response = await taskAPI.updateTask(parameter,taskId)
        dispatch(receiveTask(taskId))
        console.log(response.data);
    }
    catch (e) {
        console.log(e)
    }
}