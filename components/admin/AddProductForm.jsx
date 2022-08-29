import React from 'react'
import { Button, Form, Input, message, Space, Select, Checkbox } from 'antd';
import { useState } from 'react';
import { ArrowRightOutlined, CloseSquareOutlined } from '@ant-design/icons'
import Link from 'next/link';
import { addProduct } from '../../redux/products/addProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import Item from 'antd/lib/list/Item';
import { useEffect } from 'react';
import axios from 'axios';



const { TextArea } = Input;


const AddProductForm = (props) => {
    const newProduct = useSelector(state => state.newProductSlice.new_product)

    const dispatch = useDispatch()

    let { setActiveTabKey, setFormFinished,FetchedCategoriesData, CategoryData, BrandsData } = props

    const [SubCategoryData, setSubCategoryData] = useState([])

    

    const [form] = Form.useForm();


    const onFinish = () => {

        setFormFinished(true)
        setActiveTabKey('2')
        console.log(newProduct);
        

    };


    const onFinishFailed = () => {
        // setActiveTabKey('1')
    };

    const handleOnchangeInput = (e) => {
        dispatch((addProduct(form.getFieldValue(e))))
        // return setNewProductState(form.getFieldValue(e))
    }

    const  handleCategoryIdChange =  (e)=>{
        dispatch((addProduct(form.getFieldValue(e))))
        form.setFieldsValue({sub_category_id: null})
        
        let  category_id =  form.getFieldValue(e).category_id
        let subcategoryList = []
        FetchedCategoriesData.forEach(element=>{
            if(element.id ==  category_id){
                element.sub_categories.forEach(e=>{
                    subcategoryList.push(
                        {
                            label: e.sub_category_name,
                            value: e.id
                        }
                    )
                })

                setSubCategoryData(subcategoryList)
            }
        })

    }




    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={() => onFinishFailed} autoComplete="off"
                initialValues={{ is_active: true }}>

                <div className='flex justify-between flex-wrap items-center mr-8'>
                    <Form.Item name="product_name" label="Product Name" rules={[{ required: true, message: 'Missing Product' }]} >

                        <Input placeholder="Product name" className='w-80' onChange={() => handleOnchangeInput(Item.name)} />

                    </Form.Item>

                    <Form.Item name="category_id" label="Category" rules={[{ required: true, message: 'Missing Category' }]}>

                        <Select options={CategoryData} className='w-40' onChange={() => handleCategoryIdChange(Item.name)} />
                    </Form.Item>

                    <Form.Item name="sub_category_id" label="Sub Category" rules={[{ required: true, message: 'Missing Sub Category' }]}  >
                        <Select options={SubCategoryData} className='w-40' />
                    </Form.Item>
                </div>
                <div className='flex'>
                    <Form.Item name="brand_id" label="Brand Name" rules={[{ required: true, message: 'Missing Brand Name' }]}>
                        <Select options={BrandsData} className='w-40' onChange={() => handleOnchangeInput(Item.name)} />
                    </Form.Item>

                    <Form.Item name='is_active' label='Is Active' className='mx-44' valuePropName='checked' >
                        <Checkbox onChange={() => handleOnchangeInput(Item.name)} />
                    </Form.Item>
                </div>
                <Form.Item label='Description' className='w-1/2' name='description' rules={[{ required: true, message: 'Missing Description' }]}>
                    <TextArea rows={4} placeholder="Description" minLength={6} onChange={() => handleOnchangeInput(Item.name)} />
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