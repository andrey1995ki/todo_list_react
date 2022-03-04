import moment, {Moment} from 'moment'
import {TaskListModel, TaskModel} from "../../pages/CalendarComponent/CalendarComponent.model";

export const filterDataInCalendar = (date: Moment, taskList: TaskListModel, sortAt: 'plannedAt' | 'createdAt', completedVisible: boolean,
                                     activeVisible: boolean) => {
    let taskByDate = (task:TaskModel)=>{
        return moment(task[sortAt]).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    }

    if(!completedVisible && activeVisible){
        return taskList.filter(task=> !task.completed && taskByDate(task))
    }
    else if (completedVisible && !activeVisible){
        return taskList.filter(task=> task.completed && taskByDate(task))
    }
    return taskList.filter(task=> taskByDate(task))
}