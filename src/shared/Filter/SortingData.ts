import {FilterTaskList, sortType} from "./TaskFilter.model";

export const sortingData = (taskList:FilterTaskList,sort:sortType) => {
    if(sort==='nameAsc'){
        return taskList.sort((a, b) => a.taskName>b.taskName ? 1 : -1)
    }
    else if (sort==='nameDesc'){
        return taskList.sort((a, b) => a.taskName<b.taskName ? 1 : -1)
    }
    else if (sort==='active'){
        return taskList.sort((a,b)=>a.completed>b.completed ?1:-1)
    }
    else if(sort==='completed'){
        return taskList.sort((a,b)=>a.completed<b.completed ?1:-1)
    }
    else if(sort==='dateDesc'){
        return taskList.sort((a,b)=>a.createdAt<b.createdAt?1:-1)
    }
    return taskList.sort((a,b)=>a.createdAt>b.createdAt?1:-1)
}