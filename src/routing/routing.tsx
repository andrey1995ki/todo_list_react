import React from 'react';

import {Route, Routes, Navigate} from "react-router-dom";
import {CalendarComponent} from "../pages/CalendarComponent/CalendarComponent";
import {StatisticsComponent} from "../pages/StatisticsComponent/StatisticsComponent";
import {TaskComponent} from "../pages/TaskComponent/TaskComponent";



export const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/tasks" />} />
                <Route path="/calendar" element={<CalendarComponent/>}>
                </Route>
                <Route path="/statistics" element={<StatisticsComponent/>}>
                </Route>
                <Route path="/tasks" element={<TaskComponent/>}>
                </Route>
            </Routes>
        </>

    );
};
