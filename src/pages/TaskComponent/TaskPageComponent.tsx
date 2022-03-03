import React, {useEffect, useState} from 'react';
import {Button, Col, Divider, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {TaskListComponent} from "./components/TaskList/TaskListComponent";
import {useDispatch, useSelector} from "react-redux";
import {getTaskList, toggleLoading} from "../../store/TaskListStore/TaskList.selectors";
import {receiveTaskList} from "../../store/TaskListStore/TaskListStore";
import {PreloaderComponent} from "../../shared/Prloader/PreloaderComponent";
import {RootReducer} from "../../store/store";
import {ModalComponent} from "../../shared/Modal/ModalComponent";
import {CreateTaskComponent} from "./components/CreateTask/CreateTaskComponent";
import {TaskFilter} from "./components/Filter/TaskFilter";
import {filterData} from "./components/Filter/FilterData";
import {sortType} from "./components/Filter/TaskFilter.model";

export const TaskPageComponent = () => {
    const dispatch = useDispatch()
    const taskList = useSelector((state: RootReducer) => getTaskList(state))
    const loadingTaskList = useSelector((state: RootReducer) => toggleLoading(state))
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [completedVisible, setCompletedVisible] = useState<boolean>(false)
    const [activeVisible, setActiveVisible] = useState<boolean>(true)
    const [sort, setSort] = useState<sortType>('dateEndAsc')
    useEffect(() => {
        if (!taskList || !modalVisible) {
            dispatch(receiveTaskList())
        }
    }, [dispatch, modalVisible])

    return (
        <div>
            <Row justify="space-between">
                <Col span={8}>
                    <Button icon={<PlusOutlined/>} onClick={() => setShowCreateModal(true)}>
                        Создать новую задачу
                    </Button>
                </Col>
                <Col span={8} style={{textAlign: "right", marginRight: 10}}>
                    <TaskFilter completedVisible={completedVisible} setCompletedVisible={setCompletedVisible}
                                activeVisible={activeVisible} setActiveVisible={setActiveVisible} sort={sort}
                                setSort={setSort}/>
                </Col>
            </Row>
            <Divider/>
            {
                taskList !== null && !loadingTaskList
                    ? <TaskListComponent taskList={filterData(taskList, completedVisible, activeVisible, sort)}
                                         showModal={modalVisible}
                                         setShowModal={setModalVisible}/>
                    : <PreloaderComponent preloaderTitle={"Загрузка задач"}/>
            }
            <ModalComponent isModalVisible={showCreateModal} closeModal={setShowCreateModal}>
                <CreateTaskComponent closeModal={setShowCreateModal}/>
            </ModalComponent>
        </div>
    );
};