import React, {FC, useEffect, useState} from 'react';
import {TaskComponentModel} from "./TaskComponent.model";
import {Badge, Button, Col, Divider, Input, Popconfirm, Row, Skeleton, Space, Typography} from "antd";
import './TaskComponent.scss'
import 'moment/locale/ru';
import SubtaskComponent from "./components/SubtaskComponent";
import {useDispatch, useSelector} from "react-redux";
import {receiveSubTaskList, receiveTask, updateTask} from "../../../../store/TaskListStore/TaskListStore";
import {
    getSubTaskList,
    getTask,
    toggleLoadingTask,
    toggleSubTaskLoading
} from "../../../../store/TaskListStore/TaskList.selectors";
import SubTaskLoadingComponent from "./components/SubTaskLoadingComponent";
import {RootReducer} from "../../../../store/store";
import {TaskProgress} from "./components/TaskProgress";
import {CheckOutlined} from "@ant-design/icons";
import {TaskDataComponent} from "./components/TaskDataComponent";

const {Title} = Typography;


export const TaskComponent: FC<TaskComponentModel> = ({taskId, closeModal}) => {
    const dispatch = useDispatch()
    const subTask = useSelector((state: RootReducer) => getSubTaskList(state))
    const loadingTaskList = useSelector((state: RootReducer) => toggleSubTaskLoading(state))
    const taskData = useSelector((state: RootReducer) => getTask(state))
    const loadingTask = useSelector((state: RootReducer) => toggleLoadingTask(state))
    const [editTaskName, setEditTaskName] = useState(false)
    useEffect(() => {
        dispatch(receiveTask(taskId))
        dispatch(receiveSubTaskList(taskId))
    }, [dispatch, taskId])
    const changeTaskStatus = (status: boolean) => {
        dispatch(updateTask({completed: status}, taskId))
    }
    let countActiveSubTask = 0
    if (subTask) {
        countActiveSubTask = subTask?.filter(task => task.completed === false).length
    }

    const updateTaskData = (newValue: string) => {
        setEditTaskName(false)
        if (newValue.length > 0 && newValue !== taskData?.taskName) {
            dispatch(updateTask({taskName: newValue.trim()}, taskId))
        }
    }
    return (
        <div className={"task-data"}>
            <Title level={2} className={"task-title"}>
                {loadingTask
                    ?
                    <Skeleton active paragraph={false} style={{marginLeft: "auto", marginRight: "auto", width: "50%"}}/>
                    : editTaskName
                        ? <Input autoFocus onBlur={(e) => updateTaskData(e.target.value)}
                                 defaultValue={taskData?.taskName}
                                 style={{marginLeft: "auto", marginRight: "auto", width: "50%"}}/>
                        : <div onDoubleClick={() => {
                            !taskData?.completed && setEditTaskName(true)
                        }}>
                            {taskData?.taskName}
                            <Badge status={taskData?.completed ? "success" : "error"}/>
                        </div>
                }
            </Title>
            {subTask !== null && subTask.length > 0 && !loadingTask &&
            <div className={"task-title"}>
                <TaskProgress subTask={subTask}/>
            </div>
            }
            <Divider/>
            <Row style={{height: '70vh'}}>
                <Col flex="400px">
                    <TaskDataComponent taskData={taskData} loading={loadingTask}/>
                </Col>
                <Col flex="20px">
                    <Divider type={"vertical"} style={{height: '100%'}}/>
                </Col>
                <Col flex="auto">
                    {subTask !== null && !loadingTaskList
                        ?
                        <SubtaskComponent subTask={subTask} taskId={taskData?.id} completedTask={taskData?.completed}/>
                        : <SubTaskLoadingComponent key={`loading_${taskData?.id}`}
                                                   countSubTask={taskData?.subTask.length}/>}
                </Col>
            </Row>
            <div style={{marginTop: 25, textAlign: "center"}}>
                <Space>
                    <Popconfirm title="Имеются незавершнные подзадачи, завершить основную?"
                                onConfirm={() => changeTaskStatus(!taskData?.completed)}
                                okText="Завершить"
                                cancelText="Отмена"
                                placement="topRight"
                                disabled={taskData?.completed || countActiveSubTask === 0}
                    >
                        <Button type="primary" block icon={<CheckOutlined/>} onClick={() => {
                            (taskData?.completed || countActiveSubTask === 0) && changeTaskStatus(!taskData?.completed)
                        }}>{taskData?.completed ? 'Вернуть задачу в работу' : 'Выполнить задачу'}</Button>
                    </Popconfirm>
                    <Button block onClick={() => closeModal(false)}>Закрыть</Button>
                </Space>
            </div>
        </div>
    );
};