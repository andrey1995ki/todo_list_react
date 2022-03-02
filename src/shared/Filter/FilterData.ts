import {FilterTaskList, sortType} from "./TaskFilter.model";
import {sortingData} from "./SortingData";

export const filterData = (taskList:FilterTaskList,completedVisible:boolean,activeVisible:boolean,sort:sortType) => {
    if(!completedVisible && activeVisible){
        return sortingData(taskList.filter(task=> !task.completed),sort)
    }
    else if (completedVisible && !activeVisible){
        return sortingData(taskList.filter(task=> task.completed),sort)
    }
    return sortingData(taskList,sort)
}