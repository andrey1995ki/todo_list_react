import {FilterTaskList, sortType} from "./TaskFilter.model";
import {sortingData} from "./SortingData";
import moment, {Moment} from "moment";
import {TaskModel} from "../../pages/CalendarComponent/CalendarComponent.model";

export const filterDataInDay = (date: Moment, taskList: FilterTaskList, completedVisible: boolean, activeVisible: boolean, sort: sortType, createdVisible: boolean,
                                plannedVisible: boolean) => {
    let taskByDate = (task: TaskModel) => {
        if (createdVisible && !plannedVisible){
            return moment(task.createdAt).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        }
        else if(!createdVisible && plannedVisible){
            return moment(task.plannedAt).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        }
        return moment(task.createdAt).format('YYYY-MM-DD') === date.format('YYYY-MM-DD') || moment(task.plannedAt).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    }
    if (!completedVisible && activeVisible) {
        return sortingData(taskList.filter(task => !task.completed && taskByDate(task)), sort)
    } else if (completedVisible && !activeVisible) {
        return sortingData(taskList.filter(task => task.completed && taskByDate(task)), sort)
    }
    return sortingData(taskList.filter(task => taskByDate(task)), sort)
}