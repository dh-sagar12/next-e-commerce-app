import React from 'react'
import { Checkbox, Form, Input, Button, message } from 'antd'
import { BiSitemap } from 'react-icons/bi'
import { useState, useEffect } from 'react';
import Router from 'next/router'
import axios from 'axios';
import ImageUploader from '../../../components/admin/ImageUploader';

const AddCategory = () => {
    const baseURL = process.env.baseURL
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [CategoryItemState, setCategoryItemState] = useState({})




    





    const onFinish = () => {
        handleSaveProduct()

    }

    const onFinishFailed = () => {
        setUploading(false)
        console.log('on finish failed');
    }




    const handleOnchangeInput = (e) => {
        let { value, id } = e.target
        setCategoryItemState(preval => {
            return {
                ...preval,
                [id]: value
            }
        })
    }


    const handleChangeOnCheckBox = (e) => {
        let { checked, id } = e.target
        setCategoryItemState(preval => {
            return {
                ...preval,
                [id]: checked
            }
        })
    }

    const handleSaveProduct = () => {

        const formData = new FormData();

        formData.append('category_name', CategoryItemState.category_name)
        formData.append('slug', JSON.stringify(CategoryItemState.slug))
        formData.append('is_active', CategoryItemState.is_active)
        formData.append('description', CategoryItemState.description)
        fileList.forEach((file) => {
            formData.append('thumbnail_img', file);
        });
        setUploading(true)

        axios.post(`${baseURL}/api/add-category/`, formData).then(
            (response) => {
                let result = response.data
                if (result.status = 200) {
                    message.success(result.msg)
                    Router.push('/admin/category')
                    setUploading(false)
                } else {
                    message.error('SOMETHING WENT WRONG ON SERVER PROCESS!!')
                    setUploading(true)
                }
            }
        ).catch(err => {
            if (err.message) {
                message.error(err.message)
            } else {
                message.error('SOMETHING WENT WRONG ON SERVER PROCESS!!')
            }
        })
        setUploading(false)

    }
    return (
        <div>
            <div className="h-screen">
                <div className='px-10 py-7 space-y-5'>

                    <h2 className='font-extrabold text-lg  text-purple-600'>Add Category </h2>
                    <hr />

                    <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                        <div className='w-1/2'>
                            <Form.Item name="category_name" label="Category Name" rules={[{ required: true, message: 'Missing Cateogory Name' }]} onChange={handleOnchangeInput}>
                                <Input type='text' />
                            </Form.Item>

                            <Form.Item name="slug" label="Slug" onChange={handleOnchangeInput}
                                rules={[{ required: true, message: 'Missing Slug' }]}>
                                <Input type='text' />
                            </Form.Item>

                            <Form.Item name="description" label="Description" onChange={handleOnchangeInput}
                                rules={[{ required: true, message: 'Missing Description' }]}>
                                <Input type='text' />
                            </Form.Item>

                            <Form.Item name="is_active" label="Active" onChange={handleChangeOnCheckBox}>
                                <Checkbox />
                            </Form.Item>



                            <Form.Item name="thumbnail_img" label="Thumbnail Image" >
                                <ImageUploader fileList={fileList} setFileList={setFileList} count={2} />
                            </Form.Item>
                            <Button htmlType='submit'
                                loading={uploading}
                                disabled={fileList.length === 0}
                                className='flex items-center border-gray-50 hover:text-purple-500 hover:border-purple-400 text-gray-600 space-x-4 w-full justify-center bg-purple-50'>
                                <BiSitemap /> Save Product
                            </Button>
                        </div>


                    </Form>


                </div>

            </div>
        </div>
    )
}

export default AddCategory;