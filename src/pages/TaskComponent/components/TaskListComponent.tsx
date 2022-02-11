import React, {FC, useEffect} from 'react';
import {TaskListModelProps} from "./TaskList.model";
import {Badge, Card, List} from "antd";
import {receiveTaskList} from "../../../store/TaskListStore/TaskListStore";
import {useDispatch, useSelector} from "react-redux";
import {getTaskList, toggleLoading} from "../../../store/TaskListStore/TaskList.selectors";
import {PreloaderComponent} from "../../../shared/Prloader/PreloaderComponent";

export const TaskListComponent: FC <TaskListModelProps> = ({tasks}) => {
    const dispatch = useDispatch()
    const taskList = useSelector(state => getTaskList(state))
    const loadingTaskList = useSelector(state => toggleLoading(state))
    console.log(loadingTaskList,taskList);
    useEffect(()=>{
        dispatch(receiveTaskList())
    },[dispatch])
    return (
        <div>
            {
                taskList!==null && !loadingTaskList
                    ? <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={tasks}
                    renderItem={item => (
                        <List.Item>
                            <Card hoverable title={item.TaskName} extra={ <Badge status={item.Completed ?"success" :"error"} />}>
                                {item.TaskDescription}
                            </Card>
                        </List.Item>
                    )}
                />
                    : <PreloaderComponent preloaderTitle={"Загрузка задач"}/>
            }
        </div>
    );
};