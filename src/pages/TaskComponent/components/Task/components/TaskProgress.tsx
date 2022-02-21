import React, {FC} from 'react';
import {TaskProgressModel} from "../TaskComponent.model";
import {Progress} from "antd";

export const TaskProgress:FC<TaskProgressModel> = ({subTask}) => {
    const progressLength = subTask.length
    let countCompleted =0
    subTask.forEach(task=>{
        if (task.completed){
            countCompleted++
        }
    })
    const percentCompleted = Math.floor((countCompleted/progressLength)*100)
    return (
        <Progress size="small" percent={percentCompleted} steps={progressLength} />
    );
};