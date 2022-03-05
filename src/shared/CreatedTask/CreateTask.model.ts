import {Moment} from "moment";

export interface CreateTaskComponentModel {
    closeModal: (setVisible: boolean)=>void
    createdTaskData?:Moment
}
export interface CreateTaskFormModel {
    closeModal: (setVisible: boolean)=>void
    createdTaskData: Moment
}

export interface CreateTaskResultModel {
    result: 'success' | 'error'
    closeModal: (setVisible: boolean)=>void
}