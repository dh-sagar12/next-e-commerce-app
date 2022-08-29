import React from 'react'
import { EditOutlined } from "@ant-design/icons";
import { Tooltip } from 'antd';
import Router from 'next/router';


const EditProductData = ({product_id}) => {
  const handleEditProductButtonClick = ()=> {
    Router.push(`/admin/product/${product_id}`)
  }
  return (
    <>
      <Tooltip title="Edit Product" >
        <EditOutlined onClick={handleEditProductButtonClick}/>
      </Tooltip>
    </>
  )
}

export default EditProductData