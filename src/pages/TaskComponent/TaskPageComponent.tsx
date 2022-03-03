import React, {useEffect, useState} from 'react';
import {Divider} from "antd";
import {TaskListComponent} from "./components/TaskList/TaskListComponent";
import {useDispatch, useSelector} from "react-redux";
import {getTaskList, toggleLoading} from "../../store/TaskListStore/TaskList.selectors";
import {receiveTaskList} from "../../store/TaskListStore/TaskListStore";
import {PreloaderComponent} from "../../shared/Prloader/PreloaderComponent";
import {RootReducer} from "../../store/store";
import {TaskFilter} from "./components/Filter/TaskFilter";
import {filterData} from "./components/Filter/FilterData";
import {sortType} from "./components/Filter/TaskFilter.model";
import {TaskHeader} from "../../shared/TaskHeader/TaskHeader";

export const TaskPageComponent = () => {
    const dispatch = useDispatch()
    const taskList = useSelector((state: RootReducer) => getTaskList(state))
    const loadingTaskList = useSelector((state: RootReducer) => toggleLoading(state))
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [updateTaskData,setUpdateTaskData]= useState(false)
    const [completedVisible, setCompletedVisible] = useState<boolean>(false)
    const [activeVisible, setActiveVisible] = useState<boolean>(true)
    const [sort, setSort] = useState<sortType>('dateEndAsc')
    useEffect(() => {
        if (updateTaskData||taskList===null) {
            dispatch(receiveTaskList())
            setUpdateTaskData(false)
        }
    }, [dispatch, updateTaskData,taskList])

    return (
        <div>
            <TaskHeader needUpdate={setUpdateTaskData} setShowCreateModal={setShowCreateModal} showCreateModal={showCreateModal}>
                <TaskFilter completedVisible={completedVisible} setCompletedVisible={setCompletedVisible}
                            activeVisible={activeVisible} setActiveVisible={setActiveVisible} sort={sort}
                            setSort={setSort}/>
            </TaskHeader>
            <Divider/>
            {
                taskList !== null && !loadingTaskList
                    ? <TaskListComponent taskList={filterData(taskList, completedVisible, activeVisible, sort)}
                                         showModal={modalVisible}
                                         setShowModal={setModalVisible}
                                         needUpdate={setUpdateTaskData}
                    />
                    : <PreloaderComponent preloaderTitle={"Загрузка задач"}/>
            }
        </div>
    );
};