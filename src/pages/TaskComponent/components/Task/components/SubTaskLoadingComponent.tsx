import React, {FC} from 'react';
import {SubTaskLoading} from '../TaskComponent.model'
import {Divider, Skeleton} from "antd";

const SubTaskLoadingComponent:FC<SubTaskLoading> = ({countSubTask}) => {
    const loadingArr=[]
    let countElem = countSubTask===0 || !countSubTask ?1 :countSubTask
    for (let item=0; item < countElem; item++){
        loadingArr.push(
            <div key={`div${item}`}>
                <Skeleton active paragraph={{ rows: 3 }} title={false} key={`skeleton${item}`}/>
                <Divider key={`divider${item}`} style={{margin:"12px 0"}}/>
            </div>
        )
    }
    return (
        <div
            id="scrollableDiv"
            style={{
                overflow: 'auto',
                padding: '0 16px',
                maxHeight: '70vh'
            }}
        >
            {loadingArr}
        </div>
    );
};

export default SubTaskLoadingComponent;