export interface ModalComponentModel{
    isModalVisible:boolean
    closeModal: (setVisible: boolean)=>void
    needUpdate?:(needUpdate:boolean)=>void
}