import React, {FC, useEffect, useState} from 'react';
import {Button, Checkbox, Dropdown, Menu, Radio, Space} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, DownOutlined} from "@ant-design/icons";
import {TaskFilterModel} from "./TaskFilter.model";

export const TaskFilter: FC<TaskFilterModel> = ({
                                                    completedVisible,
                                                    setCompletedVisible,
                                                    activeVisible,
                                                    setActiveVisible, sort, setSort,
                                                    locationButton,setSortCalendar
                                                }) => {
    const [filter, setFilter] = useState<string>('Текущие')
    const [visibleFilter, setVisibleFilter] = useState(false)
    useEffect(() => {
        if (completedVisible && activeVisible) {
            setFilter('Все задачи')
        } else if (completedVisible && !activeVisible) {
            setFilter('Завершённые')
        } else setFilter('Текущие')
    },[completedVisible,activeVisible,setFilter])
    const menu = (
        <Menu>
            <Menu.Divider/>
            <Menu.Item key={"completed"}>
                <Checkbox value="Закрытые задачи" checked={completedVisible} onChange={() => {
                    !completedVisible ? setCompletedVisible(!completedVisible)
                        : activeVisible && setCompletedVisible(!completedVisible)
                }}>Открытые задачи</Checkbox>
            </Menu.Item>
            <Menu.Item key={"active"}>
                <Checkbox value="Открытые задачи" checked={activeVisible} onChange={() => {
                    !activeVisible ? setActiveVisible(!activeVisible)
                        : completedVisible && setActiveVisible(!activeVisible)
                }}>Закрытые задачи</Checkbox>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key={"sortItems"}>
                {
                    locationButton!=='calendar' && setSort
                    && <Radio.Group defaultValue={sort} buttonStyle="solid" onChange={(e) => setSort(e.target.value)}>
                        <Space direction="vertical">
                            <Radio value="dateEndAsc">Дата окончания: <ArrowDownOutlined/></Radio>
                            <Radio value="dateEndDesc">Дата окончания: <ArrowUpOutlined/></Radio>
                            <Radio value="dateStartAsc">Дата создания: <ArrowDownOutlined/></Radio>
                            <Radio value="dateStartDesc">Дата создания: <ArrowUpOutlined/></Radio>
                            <Radio value="nameAsc">Название задачи: <ArrowDownOutlined/></Radio>
                            <Radio value="nameDesc">Название задачи: <ArrowUpOutlined/></Radio>
                            {(activeVisible && completedVisible) &&
                            <>
                                <Radio value="completed">Сначала завершенные</Radio>
                                <Radio value="active">Сначала открытые</Radio>
                            </>
                            }
                        </Space>
                    </Radio.Group>
                }
                {
                    locationButton==='calendar' && setSortCalendar
                    && <Radio.Group defaultValue={sort} buttonStyle="solid" onChange={(e) => setSortCalendar(e.target.value)}>
                        <Space direction="vertical">
                            <Radio value="plannedAt">По дате окончания:</Radio>
                            <Radio value="createdAt">По дате создания:</Radio>
                        </Space>
                    </Radio.Group>
                }
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} visible={visibleFilter} onVisibleChange={(flag) => setVisibleFilter(flag)}>
            <Button type="text">{filter} <DownOutlined/></Button>
        </Dropdown>
    );
};