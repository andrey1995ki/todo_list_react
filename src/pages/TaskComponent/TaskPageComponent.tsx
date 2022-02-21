import React, {useEffect, useState} from 'react';
import {Button, Divider, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {TaskListComponent} from "./components/TaskList/TaskListComponent";
import {useDispatch, useSelector} from "react-redux";
import {getTaskList, toggleLoading} from "../../store/TaskListStore/TaskList.selectors";
import {receiveTaskList} from "../../store/TaskListStore/TaskListStore";
import {PreloaderComponent} from "../../shared/Prloader/PreloaderComponent";
import {RootReducer} from "../../store/store";
import {ModalComponent} from "../../shared/Modal/ModalComponent";
import {CreateTaskComponent} from "./components/CreateTask/CreateTaskComponent";

export const TaskPageComponent= () => {
    const dispatch = useDispatch()
    const taskList = useSelector((state:RootReducer) => getTaskList(state))
    const loadingTaskList = useSelector((state:RootReducer) => toggleLoading(state))
    const [showCreateModal,setShowCreateModal] =useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    useEffect(()=>{
        if(!taskList || !modalVisible){
            dispatch(receiveTaskList())
        }
    },[dispatch,modalVisible,taskList])

    return (
        <div>
            <Space>
                <Button icon={<PlusOutlined />} onClick={()=>setShowCreateModal(true)}>
                    Создать новую задачу
                </Button>
            </Space>
            <Divider/>
            {
                taskList!==null && !loadingTaskList
                    ? <TaskListComponent taskList={taskList} showModal={modalVisible} setShowModal={setModalVisible}/>
                    : <PreloaderComponent preloaderTitle={"Загрузка задач"}/>
            }
            <ModalComponent isModalVisible={showCreateModal} closeModal={setShowCreateModal}>
                <CreateTaskComponent closeModal={setShowCreateModal}/>
            </ModalComponent>
        </div>
    );
};