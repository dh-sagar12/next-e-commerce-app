import React from 'react'
import { Button, Form, Input, message, Space, Select, Checkbox } from 'antd';
import { useState } from 'react';
import { ArrowRightOutlined, CloseSquareOutlined } from '@ant-design/icons'
import Link from 'next/link';
import { addProduct } from '../../redux/products/addProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import Item from 'antd/lib/list/Item';
import { useEffect } from 'react';



const { TextArea } = Input;


const AddProductForm = (props) => {
    
    // const [NewProductState, setNewProductState] = useState({})
    const newProduct = useSelector(state => state.newProductSlice.new_product)

    const dispatch  =  useDispatch()

    let { setActiveTabKey, setFormFinished } = props

   
    const areas = [
        {
            label: 'Beijing',
            value: 'Beijing',
        },
        {
            label: 'Shanghai',
            value: 'Shanghai',
        },
    ];

    const [form] = Form.useForm();


    const onFinish =  () => {
        
        setFormFinished(true)
        setActiveTabKey('2')
        console.log(newProduct);
        
        // dispatch((addProduct(NewProductState)))
        // console.log('dispatched');
    };


    const onFinishFailed = () => {
        // setActiveTabKey('1')
    };

    const handleOnchangeInput = (e)=>{
        dispatch((addProduct(form.getFieldValue(e))))
        // return setNewProductState(form.getFieldValue(e))
    }
   




    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={()=>onFinishFailed} autoComplete="off" 
            initialValues={{is_active: true}}>

                <div className='flex justify-between flex-wrap items-center mr-8'>
                    <Form.Item name="product_name" label="Product Name" rules={[{ required: true, message: 'Missing Product' }]} >

                        <Input placeholder="Product name" className='w-80'  onChange={()=>handleOnchangeInput(Item.name)} />

                    </Form.Item>

                    <Form.Item name="category_id" label="Category" rules={[{ required: true, message: 'Missing Category' }]}>

                        <Select options={areas} className='w-40' onChange={()=>handleOnchangeInput(Item.name)}  />
                    </Form.Item>

                    <Form.Item name="sub_category_id" label="Sub Category" rules={[{ required: true, message: 'Missing Sub Category' }]}>
                        <Select options={areas} className='w-40' />
                    </Form.Item>
                </div>
                <div className='flex'>
                    <Form.Item name="brand_id" label="Brand Name" rules={[{ required: true, message: 'Missing Brand Name' }]}>
                        <Select options={areas} className='w-40' onChange={()=>handleOnchangeInput(Item.name)} />
                    </Form.Item>

                    <Form.Item name='is_active' label='Is Active' className='mx-44'  valuePropName='checked' >
                        <Checkbox  onChange={()=>handleOnchangeInput(Item.name)}/>
                    </Form.Item>
                </div>
                <Form.Item label='Description' className='w-1/2' name='description' rules={[{ required: true, message: 'Missing Description' }]}>
                    <TextArea rows={4} placeholder="Description" minLength={6} onChange={()=>handleOnchangeInput(Item.name)}/>
                </Form.Item>

                <Space>
                    <Button type="primary" htmlType="submit" className='flex items-center bg-slate-800 border-none hover:bg-purple-500'>
                        Next <ArrowRightOutlined />
                    </Button>

                    <Link href={'/admin/product'}>
                        <Button type="primary" className='flex items-center bg-slate-800 border-none hover:bg-purple-500'>
                            <CloseSquareOutlined /> Cancel
                        </Button>
                    </Link>
                          
                </Space>
            </Form>
        </>
    )
}

export default AddProductForm