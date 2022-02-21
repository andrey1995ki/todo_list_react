export interface CreateTaskComponentModel {
    closeModal: (setVisible: boolean)=>void
}
export interface CreateTaskFormModel {
    closeModal: (setVisible: boolean)=>void
}

export interface CreateTaskResultModel {
    result: 'success' | 'error'
    closeModal: (setVisible: boolean)=>void
}