import {Moment} from "moment";

export interface TaskHeaderModel {
    showCreateModal:boolean
    setShowCreateModal: (showCreateModal:boolean)=>void
    needUpdate: (needUpdate:boolean)=>void
    createdTaskData?:Moment
}