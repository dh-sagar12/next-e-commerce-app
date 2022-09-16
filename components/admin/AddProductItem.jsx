import React from 'react'
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from 'antd';
import Router from 'next/router';

const AddProductItem = (props) => {

    const {product_id, product_name} = props
    const handleAddItems = ()=>{
        Router.push({
            pathname: '/admin/product/item/add',
            query: {product_id: product_id, product_name: product_name}
            
        })
    }
    return (
        <>
            <Tooltip title="Add Another Product Item" >
                <PlusOutlined onClick={handleAddItems} />
            </Tooltip>

        </>
    )
}

export default AddProductItem