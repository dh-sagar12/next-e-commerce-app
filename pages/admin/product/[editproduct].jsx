import React from 'react'
import { Button, Form, Input, message, Space, Select, Checkbox, Spin } from 'antd';
import { useState } from 'react';
import { ArrowRightOutlined, CloseSquareOutlined, SaveOutlined } from '@ant-design/icons'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Item from 'antd/lib/list/Item';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';



const { TextArea } = Input;


const AddProductForm = (props) => {

    const router = useRouter()
    const { editproduct } = router.query

    const base_url = process.env.baseURL


    const [FetchedCategoriesData, setFetchedCategoriesData] = useState([])

    const [CategoryData, setCategoryData] = useState([])
    const [SubCategoryData, setSubCategoryData] = useState()
    const [BrandsData, setBrandsData] = useState([])
    const [ProductData, setProductData] = useState()
    const [UpdatedProductData, setUpdatedProductData] = useState({
        
    })
    const [form] = Form.useForm();


    useEffect(() => {
        axios.get(`${base_url}/api/get-category/`).then(res => {
            let fetchedCategories = res.data
            setFetchedCategoriesData(fetchedCategories)
            let categoryList = []
            fetchedCategories.forEach(e => {
                categoryList.push({
                    label: e.category_name,
                    value: e.id
                })

            })
            setCategoryData(categoryList)

        }).catch(e => {
            message.error(`Error; ${e.toString()}`)
        })

        axios.get(`${base_url}/api/get-brands/`).then(res => {
            let fetchedBrands = res.data
            let brands = []
            fetchedBrands.forEach(e => {
                brands.push({
                    label: e.brand_name,
                    value: e.id
                })

            })
            setBrandsData(brands)
        }).catch(e => {
            message.error(`Error: ${e.toString()}`)
        })

    }, [])

    useEffect(() => {
        console.log(UpdatedProductData);

    }, [UpdatedProductData])


    useEffect(() => {
        if (router.isReady) {
            axios.get(`${base_url}/api/get-product/${editproduct}`).then(res => {
                let product_data = res.data
                setProductData(product_data)
                setUpdatedProductData({id: product_data.id})
                console.log('type is', typeof SubCategoryData);
                let sub_cateogories = handleSubCateogryDataUpdate(product_data.category_id.id)
                setSubCategoryData(sub_cateogories)
                form.setFieldsValue({ 'product_name': product_data.product_name })
                form.setFieldsValue({ 'category_id': product_data.category_id.id })
                form.setFieldsValue({ 'sub_category_id': product_data.sub_category_id.id })
                form.setFieldsValue({ 'brand_id': product_data.brand_id.id })
                form.setFieldsValue({ 'description': product_data.description })
                form.setFieldsValue({ 'is_active': product_data.is_active })


            }).catch(e => {
                if (e.message) {
                    message.error(e.message)
                }
                else {
                    message.error('something went wrong!!!')
                }
            })
        }

    }, [router.isReady])


    useEffect(() => {
        console.log('sub cateogry data' , SubCategoryData);
    }, [SubCategoryData])
    




    // useEffect(() => {
    //     console.log(ProductData);
    //     let sub_cateogories = handleSubCateogryDataUpdate(ProductData.category_id.id)
    //     setSubCategoryData(sub_cateogories)
    // }, [ProductData])







    const onFinish = () => {
        console.log(UpdatedProductData);


    };


    const onFinishFailed = () => {
        // setActiveTabKey('1')
    };


    const handleSubCateogryDataUpdate = (category_id) => {
        let sub_category_data = []
        
        FetchedCategoriesData.forEach(category => {
            if (category_id === category.id) {
                category.sub_categories.forEach(subcategory => {
                    sub_category_data.push({
                        label: subcategory.sub_category_name,
                        value: subcategory.id
                    })
                })
            }
        })
        // console.log('sub_cateogory_data: ', sub_category_data);
        return sub_category_data
    }

    const handleChangeInCategoryData = (event)=>{
        setUpdatedProductData((preval)=>{
            return {
                ...preval, category_id: event
            }
        })
        form.setFieldsValue({'sub_category_id': ''})
        let sub_categories = handleSubCateogryDataUpdate(event)
        setSubCategoryData(sub_categories)
    }

    const handleChangeInSubCategory = (event)=>{
        setUpdatedProductData((preval)=>{
            return {
                ...preval, sub_category_id: event
            }
        })
    }

    const handleInputChange =(event)=>{
        let value= event.target.value
        let key = event.target.id
        setUpdatedProductData((preval)=>{
                return {
                    ...preval,
                    [key]: value
                }
        })
    }


    return (

        <>
            <div className='mx-6'>
                <div className='text-purple-600 font-bold text-2xl leading-loose'>
                    Edit Product #{ProductData !== undefined? ProductData.id: '' }
                </div>
                <hr className='mb-5' />

                {
                    ProductData !== undefined && typeof SubCategoryData !== undefined?
                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={() => onFinishFailed} autoComplete="off"
                        >
                            <div className='flex justify-between flex-wrap items-center mr-8'>
                                <Form.Item name="product_name" label="Product Name" rules={[{ required: true, message: 'Missing Product' }]} 
                                 onChange={handleInputChange}>
                                    <Input placeholder="Product name" className='w-80' />

                                </Form.Item>

                                <Form.Item name="category_id" label="Category" rules={[{ required: true, message: 'Missing Category' }]}>
                                    <Select options={CategoryData} className='w-40' onChange={handleChangeInCategoryData} />
                                </Form.Item>

                                <Form.Item name="sub_category_id" label="Sub Category" rules={[{ required: true, message: 'Missing Sub Category' }]} onChange={handleChangeInSubCategory}>
                                    <Select options={SubCategoryData} className='w-40' />
                                </Form.Item>
                            </div>
                            <div className='flex'>
                                <Form.Item name="brand_id" label="Brand Name" rules={[{ required: true, message: 'Missing Brand Name' }]}>
                                    <Select options={BrandsData} className='w-40' />
                                </Form.Item>

                                <Form.Item name='is_active' label='Is Active' className='mx-44'>
                                    <Checkbox checked={ProductData.is_active} />
                                </Form.Item>
                            </div>
                            <Form.Item label='Description' className='w-1/2' name='description' rules={[{ required: true, message: 'Missing Description' }]} onChange={handleInputChange}>
                                <TextArea rows={4} placeholder="Description" minLength={6} />
                            </Form.Item>

                            <Space>
                                <Button type="primary" htmlType="submit" className='flex items-center bg-slate-800 border-none hover:bg-purple-500'>
                                    <SaveOutlined />Save
                                </Button>

                                <Link href={'/admin/product'}>
                                    <Button type="primary" className='flex items-center bg-slate-800 border-none hover:bg-purple-500'>
                                        <CloseSquareOutlined /> Cancel
                                    </Button>
                                </Link>

                            </Space>
                        </Form>
                        :
                        <div className='flex justify-center items-center h-96'>
                            <Spin size='large' className=''></Spin>
                        </div>
                }
            </div>

        </>
    )
}


export default AddProductForm