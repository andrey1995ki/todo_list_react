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
import {TaskFilter} from "../../../shared/Filter/TaskFilter";
import {sortType} from "../../../shared/Filter/TaskFilter.model";
import {filterDataInDay} from "../../../shared/Filter/FilterDataInDay";

const {Title} = Typography;

export const TaskListByDateComponent: FC<TaskListByDateModel> = ({
                                                                     selectedDate,
                                                                     taskList,
                                                                     sortAt,
                                                                     completedVisible,
                                                                     activeVisible,
                                                                 }) => {
    const [sortTask, setSortTask] = useState<sortType>("dateEndAsc")
    const [showModal, setShowModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [updateTaskData, setUpdateTaskData] = useState(false)
    const [completed, setCompletedVisible] = useState<boolean>(completedVisible)
    const [active, setActiveVisible] = useState<boolean>(activeVisible)
    const [idShowTask, setIdShowTask] = useState<string>('0')
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(updateTaskData,showModal);
        if (updateTaskData&&!showModal) {
            dispatch(receiveTaskList())
            setUpdateTaskData(false)
        }
    }, [dispatch, updateTaskData,showModal])
    const modalVisible = (id: string) => {
        setIdShowTask(id)
        setShowModal(true)
    }
    return (
        <div>
            <Title level={2} className={"task-list-title"}>
                {selectedDate.format('LL')}
            </Title>
            <Divider className={'task-list-divider'}/>
            <TaskHeader showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} needUpdate={setUpdateTaskData}>
                <TaskFilter completedVisible={completed}
                            setCompletedVisible={setCompletedVisible}
                            activeVisible={active} setActiveVisible={setActiveVisible}
                            locationButton={'taskByDay'}
                            sort={sortTask} setSort={setSortTask}
                />
            </TaskHeader>
            <Divider className={'task-list-divider'}/>
            <List
                itemLayout="horizontal"
                dataSource={filterDataInDay(selectedDate,taskList, completed, active, sortTask)}
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
                                        {moment(item.createdAt).format('LLL')}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Дата окончания задачи">
                                        {moment(item.plannedAt).format('LLL')}
                                    </Descriptions.Item>
                                </Descriptions>
                            }
                        />
                    </List.Item>
                )}
            />
            <ModalComponent isModalVisible={showModal} closeModal={setShowModal}>
                <TaskComponent taskId={idShowTask} closeModal={setShowModal} needUpdate={setUpdateTaskData}/>
            </ModalComponent>
        </div>
    );
};