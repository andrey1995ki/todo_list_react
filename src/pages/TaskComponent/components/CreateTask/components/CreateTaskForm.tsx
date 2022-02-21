import React, {useState,FC} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, Row, Space} from "antd";
import moment, {Moment} from "moment";
import locale from "antd/es/date-picker/locale/ru_RU";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {createdTask} from "../../../../../store/TaskListStore/TaskListStore";
import '../CreateTaskComponent.scss'
import {CreateTaskFormModel} from "../CreateTask.model";

export const CreateTaskForm:FC<CreateTaskFormModel> = ({closeModal}) => {
    const [createdData, setCreatedDate] = useState<Moment>(moment())
    const [created,setCreated] = useState<boolean>(false)
    const dispatch = useDispatch()
    const onSubmit = (data: any) => {
        setCreated(true)
        dispatch(createdTask(data.taskName, data.taskDescription, data.createdAt.format('YYYY-MM-DD HH:mm:ss'), data.plannedAt.format('YYYY-MM-DD HH:mm:ss'), data.subTask))
    }
    const disablePlannedDate = (current: Moment) => {
        return current < createdData;
    }
    return (
        <Form name={'createTask'} onFinish={onSubmit} className={'create-task-form'}>
            <Row style={{height: '78vh'}}>
                <Col flex="auto">
                    <Form.Item name={"taskName"} rules={[{
                        required: true,
                        message: 'Названи не может быть пустым'
                    }]}>
                        <Input placeholder={"Название задачи"} disabled={created}/>
                    </Form.Item>
                    <Form.Item name={"taskDescription"} rules={[{
                        required: true,
                        message: 'Описание не может быть пустым'
                    }]}>
                        <Input.TextArea maxLength={500} minLength={10} autoSize={true} showCount={true}
                                        placeholder={"Описание задачи"} disabled={created} allowClear={true}/>
                    </Form.Item>
                    <Form.Item name={"createdAt"} rules={[{
                        required: true,
                        message: 'Начало выполнения не может быть пустым'
                    }]}
                               initialValue={moment()}
                    >
                        <DatePicker showTime format="DD.MM.YYYY HH:mm:ss" style={{width: '100%'}} locale={locale}
                                    onChange={(date) => (date !== null && setCreatedDate(date))}
                                    placeholder={'Начало выполнения'} disabled={created} />
                    </Form.Item>
                    <Form.Item name={"plannedAt"} rules={[
                        {
                            required: true,
                            message: 'Планируемая дата не может быть пустой'
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('createdAt') < value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Планируемая дата окончаниия не может быть раньше даты начала'));
                            },
                        })
                    ]}>
                        <DatePicker showTime format="DD.MM.YYYY HH:mm:ss" style={{width: '100%'}} locale={locale}
                                    placeholder={'Планируемая дата окончания'}
                                    disabledDate={disablePlannedDate} disabled={created}/>
                    </Form.Item>
                </Col>
                <Col flex={'20px'}>
                    <Divider type={"vertical"} style={{height: '100%'}}/>
                </Col>
                <Col flex={"50%"}>
                    <Form.List name={"subTask"}>
                        {(fields, {add, remove}) => (
                            <>
                                <div style={{maxHeight: '72vh', overflow: 'auto'}}>
                                    {fields.map(({key, name, ...restField}) => (
                                        <Row key={key}>
                                            <Col flex={"auto"}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'description']}
                                                    rules={[{
                                                        required: true,
                                                        message: `Отсутствует описание ${name + 1}-ой подзадачи`
                                                    }]}
                                                >
                                                    <Input.TextArea maxLength={500} minLength={10} autoSize={true}
                                                                    showCount={true} autoFocus={true}
                                                                    placeholder={`${name + 1}-ая подзадача`} disabled={created}
                                                                    allowClear={true}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col flex={"30px"}>
                                                <MinusCircleOutlined onClick={() => remove(name)}
                                                                     style={{marginLeft: 8}}/>
                                            </Col>
                                        </Row>

                                    ))}
                                </div>
                                <Form.Item>
                                    <Button disabled={created} onClick={() => {
                                        add()
                                    }} block icon={<PlusOutlined/>}>
                                        Добавить подзадачу
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Col>
            </Row>
            <Form.Item style={{margin: 5, textAlign: "center"}}>
                <Space size={16}>
                    <Button htmlType={"submit"} loading={created}>Создать задачу</Button>
                    <Button danger onClick={()=>closeModal(true)}>Закрыть</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};