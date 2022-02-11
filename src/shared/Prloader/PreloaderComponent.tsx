import React, {FC} from 'react';
import {PreloaderComponentModel} from "./PreloaderComponent.model";
import {Spin, Typography} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import style from './PreloaderComponent.module.css'

const {Title} = Typography;

export const PreloaderComponent: FC<PreloaderComponentModel> = ({preloaderTitle}) => {
    return (
        <div className={style.preloaderBlock}>
            <Spin indicator={<LoadingOutlined className={style.spinPreloader} spin/>}
                  tip={<Title level={2} className={style.textPreloader}>{`${preloaderTitle}...`}</Title>}
            />
        </div>
    );
};
