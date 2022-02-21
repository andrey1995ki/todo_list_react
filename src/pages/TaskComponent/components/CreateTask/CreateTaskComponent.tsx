import React, {FC, useEffect} from 'react';
import {Divider, Typography} from "antd";
import './CreateTaskComponent.scss'
import 'moment/locale/ru';
import {CreateTaskForm} from "./components/CreateTaskForm";
import {useDispatch, useSelector} from "react-redux";
import {getCreatedTaskResult} from "../../../../store/TaskListStore/TaskList.selectors";
import {RootReducer} from "../../../../store/store";
import {CreateTaskResult} from "./components/CreateTaskResult";
import {CreateTaskComponentModel} from "./CreateTask.model";
import {setCreatedTaskResult} from "../../../../store/TaskListStore/TaskListStore";

const {Title} = Typography;

export const CreateTaskComponent:FC<CreateTaskComponentModel> = ({closeModal}) => {
    const dispatch = useDispatch()
    const createdResult= useSelector((state:RootReducer) => getCreatedTaskResult(state))
    useEffect(()=>{
        dispatch(setCreatedTaskResult(null))
    },[dispatch])
    if (createdResult!==null){

    }
    return (
        <div>
            <Title level={2} className={"create-task-title"}>
                Создание задачи
            </Title>
            <Divider/>
            {createdResult===null
                ?<CreateTaskForm closeModal={closeModal}/>
                :<CreateTaskResult result={createdResult} closeModal={closeModal}/>
            }

        </div>
    );
};