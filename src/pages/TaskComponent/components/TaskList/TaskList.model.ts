import {TaskList} from '../../../../store/TaskListStore/TaskList.model'
export interface TaskListModelProps {
    taskList:Array<TaskList>
    showModal: boolean
    setShowModal: (showModal: boolean)=>void
}