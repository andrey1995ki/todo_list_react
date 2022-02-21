import React, {FC} from 'react';
import {CreateTaskResultModel} from '../CreateTask.model'
import {Button, Result} from "antd";
import {useDispatch} from "react-redux";
import {receiveTaskList, setCreatedTaskResult} from "../../../../../store/TaskListStore/TaskListStore";

export const CreateTaskResult:FC<CreateTaskResultModel> = ({result,closeModal}) => {
    const dispatch = useDispatch()
    const closeResult=()=>{
        dispatch(setCreatedTaskResult(null))
        closeModal(false)
        dispatch(receiveTaskList())
    }

    return (
        <Result
            status={result}
            title={result==='success' ?"Задача успешно создана" :'Ошибка создания задачи'}
            subTitle={result==='success' ?`` :'Повторите попытку позднее'}
            extra={[
                <Button type="primary" key="console" onClick={closeResult}>
                    Закрыть окно
                </Button>,
            ]}
        />
    );
};