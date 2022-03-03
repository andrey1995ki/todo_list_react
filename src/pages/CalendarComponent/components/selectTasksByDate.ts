import moment, {Moment} from 'moment'
import {TaskListModel} from "../CalendarComponent.model";

export const selectTasksByDate = (date:Moment,taskList:TaskListModel,sortAt:'plannedAt'|'createdAt') => {
    let listDate:TaskListModel=[]
    taskList.forEach(task=>{
        if(moment(task[sortAt]).format('YYYY-MM-DD')===date.format('YYYY-MM-DD')){
            listDate.push(task)
        }
    })
    return listDate
}