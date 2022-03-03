import React, {FC, useEffect, useState} from 'react';
import {TaskListByDateModel} from "../CalendarComponent.model";
import moment from "moment";
import '../CalendarComponent.scss'
import {Badge, Descriptions, Divider, List, Tooltip, Typography} from "antd";
import {TaskProgress} from "../../../shared/TaskProgress/TaskProgress";
import {ModalComponent} from "../../../shared/Modal/ModalComponent";
import {TaskComponent} from "../../../shared/TaskData/TaskComponent";
import {useDispatch} from "react-redux";
import {receiveTaskList} from "../../../store/TaskListStore/TaskListStore";
import {TaskHeader} from "../../../shared/TaskHeader/TaskHeader";

const {Title} = Typography;

export const TaskListByDateComponent: FC<TaskListByDateModel> = ({
                                                                     selectedDate,
                                                                     taskList,
                                                                     sortAt
                                                                 }) => {
    const [sortTask, setSortTask] = useState(sortAt)
    const [showModal, setShowModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [updateTaskData, setUpdateTaskData] = useState(false)
    const [idShowTask, setIdShowTask] = useState<string>('0')
    const dispatch = useDispatch()
    useEffect(() => {
        if (updateTaskData) {
            dispatch(receiveTaskList())
            setUpdateTaskData(false)
        }
    }, [dispatch, updateTaskData])
    const modalVisible = (id: string) => {
        setIdShowTask(id)
        setShowModal(true)
    }
    let taskListByDate
    if (sortTask === 'all') {
        taskListByDate = taskList.filter(task =>
            moment(task.plannedAt).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
            && moment(task.createdAt).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD'))
    } else {
        taskListByDate = taskList.filter(task =>
            moment(task[sortTask]).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD'))
    }
    return (
        <div>
            <Title level={2} className={"task-list-title"}>
                {selectedDate.format('LL')}
            </Title>
            <Divider className={'task-list-divider'}/>
            <TaskHeader showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} needUpdate={setUpdateTaskData}>

            </TaskHeader>
            <Divider className={'task-list-divider'}/>
            <List
                itemLayout="horizontal"
                dataSource={taskListByDate}
                className={'task-list-by-date'}
                renderItem={item => (
                    <List.Item onClick={() => modalVisible(item.id)}>
                        <List.Item.Meta
                            title={<>{item.taskName}<Badge status={item.completed ? "success" : "error"}/></>}
                            description={
                                <Descriptions title={false} bordered={false}>
                                    <Descriptions.Item>
                                        <div className={'task-by-date-descriptions'}>
                                            {item.taskDescription}
                                        </div>
                                        {item.subTask.length > 0 &&
                                        <Tooltip
                                            title={`Всего подзадач ${item.subTask.length}. 
                                            В работе ${item.subTask.filter(task => !task.completed).length}`}>
                                            <div className={'task-by-date-progress'}>
                                                <TaskProgress subTask={item.subTask}/>
                                            </div>
                                        </Tooltip>
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Дата создания">
                                        {moment(item.plannedAt).format('LLL')}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Дата окончания задачи">
                                        {moment(item.createdAt).format('LLL')}
                                    </Descriptions.Item>
                                </Descriptions>
                            }
                        />
                    </List.Item>
                )}
            />
            <ModalComponent isModalVisible={showModal} closeModal={setShowModal} needUpdate={setUpdateTaskData}>
                <TaskComponent taskId={idShowTask} closeModal={setShowModal} needUpdate={setUpdateTaskData}/>
            </ModalComponent>
        </div>
    );
};