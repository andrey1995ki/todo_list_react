import React, {FC} from 'react';
import {CalendarHeaderModel} from "../CalendarComponent.model";
import '../CalendarComponent.scss'
import {Col, Row, Typography} from "antd";
import moment from "moment";

const {Title, Link} = Typography;

export const CalendarHeader: FC<CalendarHeaderModel> = ({value, type, onTypeChange, setSelectedDate, children}) => {
    let selectedCurrentDate = value.format('YYYY-MM') !== moment().format('YYYY-MM')
    return (
        <Row>
            <Col span={8}>
            </Col>
            <Col span={8}>
                <Title level={2}
                       className={`calendar-list-title ${selectedCurrentDate ? 'with-link' : ''}`}
                >
                    {type === 'month' ? <div onClick={
                        () => {
                            onTypeChange('year')
                        }}
                    >{value.format('MMM YYYY')}</div> : <div onClick={
                        () => {
                            onTypeChange('month')
                        }}
                    >{value.format('YYYY')}</div>}
                </Title>
                <div style={{textAlign: "center"}} className={'calendar-list-title-back-link'}>
                    {
                        selectedCurrentDate && <Link onClick={() => setSelectedDate(moment())}>
                            К текущему месяцу
                        </Link>
                    }
                </div>
            </Col>
            <Col span={8} className={'calendar-task-sort'}>
                {children}
            </Col>
        </Row>
    );
};