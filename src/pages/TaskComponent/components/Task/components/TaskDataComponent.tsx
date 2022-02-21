import React, {FC, useState} from 'react';
import {TaskData} from "../TaskComponent.model";
import {DatePicker, Descriptions, Input, Skeleton} from "antd";
import moment from "moment";
import locale from "antd/es/date-picker/locale/ru_RU";
import '../../../../../App.scss'
import {updateTask} from "../../../../../store/TaskListStore/TaskListStore";
import {useDispatch} from "react-redux";

export const TaskDataComponent: FC<TaskData> = ({taskData, loading}) => {
    const dispatch = useDispatch()
    const [editDescription, setEditDescription] = useState(false)
    const [editCreatedAt, setEditCreatedAt] = useState(false)
    const [editPlannedAt, setEditPlannedAt] = useState(false)
    const updateTaskData = (newValue:string) => {
        setEditDescription(false)
        if(newValue.length>0 && newValue !== taskData?.taskDescription){
            dispatch(updateTask({taskDescription:newValue.trim()},taskData?.id))
        }
    }
    return (
        <>
            <Descriptions column={1} className={"task-description"}>
                <Descriptions.Item label="Описание задачи">
                    {loading
                        ? <Skeleton active paragraph={{rows: 1}} title={false} style={{margin: 0}}/>
                        : editDescription
                            ? <Input.TextArea autoFocus onBlur={(e) => {updateTaskData(e.target.value)}} defaultValue={taskData?.taskDescription} autoSize maxLength={500} showCount/>
                            : <div onDoubleClick={() => {
                                !taskData?.completed &&
                                setEditDescription(true)
                            }}>{taskData?.taskDescription}</div>
                    }
                </Descriptions.Item>
                <Descriptions.Item
                    label="Начало задачи">
                    {loading
                        ? <Skeleton active paragraph={{rows: 1}} title={false} style={{margin: 0}}/>
                        : editCreatedAt
                            ? <DatePicker showTime format="DD.MM.YYYY HH:mm:ss" style={{width: '100%'}} locale={locale}
                                          defaultValue={moment(taskData?.createdAt)}
                                          onOpenChange={(open) => !open && setEditCreatedAt(false)}
                                          autoFocus
                                          open
                                          disabledDate={(current) => current > moment(taskData?.plannedAt)}
                                          onChange={(value)=>{value && dispatch(updateTask({createdAt:value.format('YYYY-MM-DD HH:mm:ss')},taskData?.id))}}
                            />
                            : <div
                                onDoubleClick={() => {
                                    !taskData?.completed &&
                                    setEditCreatedAt(true)
                                }}>{moment(taskData?.createdAt).format('LLL')}</div>
                    }
                </Descriptions.Item>
                <Descriptions.Item
                    label="Окончание задачи">
                    {loading
                        ? <Skeleton active paragraph={{rows: 1}} title={false} style={{margin: 0}}/>
                        : editPlannedAt
                            ? <DatePicker showTime format="DD.MM.YYYY HH:mm:ss" style={{width: '100%'}} locale={locale}
                                          defaultValue={moment(taskData?.plannedAt)} disabledDate={(current) => current < moment(taskData?.createdAt)}
                                          onOpenChange={(open) => !open && setEditPlannedAt(false)}
                                          autoFocus
                                          open
                                          onChange={(value)=>{value && dispatch(updateTask({plannedAt:value.format('YYYY-MM-DD HH:mm:ss')},taskData?.id))}}
                            />
                            : <div onDoubleClick={()=> {
                                !taskData?.completed &&
                                setEditPlannedAt(true)
                            }}>{ moment(taskData?.plannedAt).format('LLL')}</div>
                    }
                </Descriptions.Item>
                <Descriptions.Item
                    label="Статус">
                    {loading
                        ? <Skeleton active paragraph={{rows: 1}} title={false} style={{margin: 0}}/>
                        : taskData?.completed ? 'Завершена' : 'В процессе'
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Всего подзадач">
                    {loading
                        ? <Skeleton active paragraph={{rows: 1}} title={false} style={{margin: 0}}/>
                        : taskData?.subTask.length
                    }
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};