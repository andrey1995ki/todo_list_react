import {SubTaskList, TaskList} from "../../../../store/TaskListStore/TaskList.model";

export interface TaskComponentModel {
    taskId: string
    closeModal: (showModal:boolean)=>void
}

export interface SubTaskComponentModel {
    subTask: Array<SubTaskList>
    taskId: string | undefined
    completedTask: boolean | undefined
}
export interface SubTaskLoading {
    countSubTask: number | undefined
}
export interface TaskProgressModel {
    subTask: Array<SubTaskList>
}
export interface SubTaskListModel{
    subTask: SubTaskList
    taskId: string | undefined
    chekCompletedSubTask: (subtaskId:string)=>void
    completedTask: boolean | undefined
}
export interface CreatedSubTask {
    description:string
}
export interface TaskData {
    taskData:TaskList | null
    loading:boolean
}
export interface TaskEditData {
    taskData:TaskList | null
    setEditData: (editData: boolean)=>void
}