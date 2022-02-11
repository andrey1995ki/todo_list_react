import React from 'react';
import {Button, Divider, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {TaskListComponent} from "./components/TaskListComponent";
import {TaskList} from "./components/TaskList.model";

export const TaskComponent= () => {
    let task:Array<TaskList> =[
        {
            "TaskName": "TaskName 1",
            "Completed": true,
            "id": 1,
            "TaskDescription":"Описание Задчаи 1"
        },
        {
            "TaskName": "TaskName 2",
            "Completed": false,
            "id": 2,
            "TaskDescription":"Описание Задчаи 2"
        }
    ]
    return (
        <div>
            <Space>
                <Button icon={<PlusOutlined />}>
                    Создать новую задачу
                </Button>
            </Space>
            <Divider/>
            <TaskListComponent tasks={task}/>

        </div>

    );
};