import React from 'react'
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from 'antd';

const AddProductItem = () => {
    return (
        <>
            <Tooltip title="Add Another Product Item" >
                <PlusOutlined />
            </Tooltip>

        </>
    )
}

export default AddProductItem