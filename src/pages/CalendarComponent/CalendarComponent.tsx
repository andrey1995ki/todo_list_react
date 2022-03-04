import React, {useEffect, useState} from 'react';
import {Badge, Calendar} from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import moment, {Moment} from "moment";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../store/store";
import {getTaskList, toggleLoading} from "../../store/TaskListStore/TaskList.selectors";
import {receiveTaskList} from "../../store/TaskListStore/TaskListStore";
import {PreloaderComponent} from "../../shared/Prloader/PreloaderComponent";
import {filterDataInCalendar} from "../../shared/Filter/FilterDataInCalendar";
import './CalendarComponent.scss'
import {ModalComponent} from "../../shared/Modal/ModalComponent";
import {TaskListByDateComponent} from "./components/TaskListByDateComponent";
import {CalendarHeader} from "./components/CalendarHeader";
import {CalendarMode} from "./CalendarComponent.model";
import {TaskFilter} from "../../shared/Filter/TaskFilter";
import {sortCalendar} from "../../shared/Filter/TaskFilter.model";

export const CalendarComponent = () => {
    const dispatch = useDispatch()
    const taskList = useSelector((state: RootReducer) => getTaskList(state))
    const loadingTaskList = useSelector((state: RootReducer) => toggleLoading(state))
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Moment>(moment())
    const [calendarMode, setCalendarMode] = useState<CalendarMode>('month')
    const [completedVisible, setCompletedVisible] = useState<boolean>(false)
    const [activeVisible, setActiveVisible] = useState<boolean>(true)
    const [sort, setSort] = useState<sortCalendar>('plannedAt')
    useEffect(() => {
        dispatch(receiveTaskList())
    }, [dispatch])
    const changeMonthOfWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        let onScrollElement = (e.target as HTMLElement).scrollHeight <= 0
        console.log(onScrollElement, (e.target as HTMLElement).scrollHeight);
        if (!onScrollElement) {
            if (e.deltaY > 0) {
                setSelectedDate(moment(selectedDate.add(1, calendarMode)))
            } else if (e.deltaY < 0) {
                setSelectedDate(moment(selectedDate.subtract(1, calendarMode)))
            }
        }

    }
    const showModalByDate = (date: Moment) => {
        setSelectedDate(date)
        if (calendarMode === 'month') {
            setModalVisible(true)
        } else {
            setCalendarMode('month')
        }
    }
    const dateCellRender = (date: Moment) => {
        if (taskList) {
            let listDate = filterDataInCalendar(date, taskList, sort,completedVisible,activeVisible)
            return (
                <ul className="task-day">
                    {listDate.map(item => (
                        <li key={item.id}>
                            <Badge status={item.completed ? 'success' : 'error'} text={item.taskName}/>
                        </li>
                    ))}
                </ul>
            )
        }
    }
    return (
        taskList !== null && !loadingTaskList
            ? <>
                <div onWheel={(e) => changeMonthOfWheel(e)}>
                    <Calendar locale={locale} dateCellRender={dateCellRender} className={'task-calendar'}
                              onPanelChange={(date: Moment, mode: CalendarMode) => setCalendarMode(mode)}
                              onSelect={(date) => showModalByDate(date)}
                              mode={calendarMode}
                              defaultValue={selectedDate}
                              value={selectedDate}
                              headerRender={
                                  ({value}) =>
                                      <CalendarHeader value={value} type={calendarMode}
                                                      onTypeChange={setCalendarMode} setSelectedDate={setSelectedDate}>
                                          <TaskFilter completedVisible={completedVisible}
                                                      setCompletedVisible={setCompletedVisible}
                                                      activeVisible={activeVisible} setActiveVisible={setActiveVisible}
                                                      locationButton={'calendar'}
                                                      sort={sort} setSortCalendar={setSort}
                                          />
                                      </CalendarHeader>
                              }
                    />
                </div>
                <ModalComponent isModalVisible={modalVisible} closeModal={setModalVisible}>
                    <TaskListByDateComponent selectedDate={selectedDate} taskList={taskList} sortAt={sort} activeVisible={activeVisible} completedVisible={completedVisible}/>
                </ModalComponent>
            </>
            : <PreloaderComponent preloaderTitle={"Загрузка задач"}/>
    );
};