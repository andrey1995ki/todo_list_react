import {FilterTaskList, sortType} from "./TaskFilter.model";
import {sortingData} from "./SortingData";
import moment, {Moment} from "moment";
import {TaskModel} from "../../pages/CalendarComponent/CalendarComponent.model";

export const filterDataInDay = (date: Moment,taskList:FilterTaskList,completedVisible:boolean,activeVisible:boolean,sort:sortType) => {
    let taskByDate = (task:TaskModel)=>{
        return moment(task.createdAt).format('YYYY-MM-DD') === date.format('YYYY-MM-DD') || moment(task.plannedAt).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    }
    if(!completedVisible && activeVisible){
        return sortingData(taskList.filter(task=> !task.completed && taskByDate(task)),sort)
    }
    else if (completedVisible && !activeVisible){
        return sortingData(taskList.filter(task=> task.completed && taskByDate(task)),sort)
    }
    return sortingData(taskList.filter(task=>taskByDate(task)),sort)
}