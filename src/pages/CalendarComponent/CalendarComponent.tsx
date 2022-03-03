import React, {useEffect, useState} from 'react';
import {Badge, Calendar} from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import moment, {Moment} from "moment";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../store/store";
import {getTaskList, toggleLoading} from "../../store/TaskListStore/TaskList.selectors";
import {receiveTaskList} from "../../store/TaskListStore/TaskListStore";
import {PreloaderComponent} from "../../shared/Prloader/PreloaderComponent";
import {selectTasksByDate} from "./components/selectTasksByDate";
import './CalendarComponent.scss'
import {ModalComponent} from "../../shared/Modal/ModalComponent";
import {TaskListByDateComponent} from "./components/TaskListByDateComponent";

export const CalendarComponent = () => {
    const dispatch = useDispatch()
    const taskList = useSelector((state: RootReducer) => getTaskList(state))
    const loadingTaskList = useSelector((state: RootReducer) => toggleLoading(state))
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [selectedDate,setSelectedDate] = useState<Moment>(moment())
    useEffect(() => {
        dispatch(receiveTaskList())
    }, [dispatch])
    console.log(taskList);
    const showModalByDate = (date:Moment)=>{
        setModalVisible(true)
        setSelectedDate(date)
    }
    const dateCellRender = (date: Moment) => {
        if (taskList) {
            let listDate = selectTasksByDate(date, taskList, 'plannedAt')
            return (
                <ul className="task-day">
                    {listDate.map(item => (
                        <li key={item.id}>
                            <Badge status={item.completed ?'success' :'error'} text={item.taskName} />
                        </li>
                    ))}
                </ul>
            )
        }
    }
    return (
            taskList !== null && !loadingTaskList
            ?  <>
                    <Calendar locale={locale} dateCellRender={dateCellRender} className={'task-calendar'}
                           onPanelChange={(date: Moment, mode: string) => console.log(date, mode)}
                           onSelect={(date) => showModalByDate(date)}/>
                    <ModalComponent isModalVisible={modalVisible} closeModal={setModalVisible}>
                        <TaskListByDateComponent selectedDate={selectedDate} taskList={taskList} sortAt={'plannedAt'}/>
                    </ModalComponent>
               </>
            : <PreloaderComponent preloaderTitle={"Загрузка задач"}/>
    );
};