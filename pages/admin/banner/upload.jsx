import React from 'react'
import { Checkbox, Form, Input, Button, message } from 'antd'
import { BiSitemap } from 'react-icons/bi'
import { useState, useEffect } from 'react';
import Router from 'next/router'
import axios from 'axios';
import ImageUploader from '../../../components/admin/ImageUploader';

const Upload = () => {
    const baseURL = process.env.baseURL
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [BannerItemState, setBannerItemState] = useState({})
    



    useEffect(() => {
      
        console.log(BannerItemState);
      
    }, [BannerItemState])
    




    const onFinish = () => {
        handleSaveProduct()

    }

    const onFinishFailed = () => {
        console.log('on finish failed');
    }




    const handleOnchangeInput = (e) => {
        let { value, id } = e.target
        setBannerItemState(preval => {
            return {
                ...preval,
                [id]: value
            }
        })
    }


    const handleChangeOnCheckBox = (e)=>{
        let { checked, id } = e.target
        setBannerItemState(preval => {
            return {
                ...preval,
                [id]: checked
            }
        })
    }
    
    const handleSaveProduct = () => {

        const formData = new FormData();

        formData.append('alt_text', BannerItemState.alt_text )
        formData.append('redirect_url', BannerItemState.redirect_url )
        formData.append('is_active', BannerItemState.is_active )
        fileList.forEach((file) => {
            formData.append('file_name', file);
        });
        setUploading(true)

        axios.post(`${baseURL}/api/add-banner-image/`, formData).then(
            (response)=>{
                let result  =  response.data
                if (result.status = 200){
                    message.success(result.msg)
                    setUploading(false)
                }else{
                message.error('SOMETHING WENT WRONG ON SERVER PROCESS!!')

                }
            }
        ).catch(err=>{
            if(err.message){
                message.error(err.message)
            }else{
                message.error('SOMETHING WENT WRONG ON SERVER PROCESS!!')
            }
        }).finally(
            Router.push('/admin/banner')
        )
    }
    return (
        <div>
            <div className="h-screen">
                <div className='px-10 py-7 space-y-5'>

                    <h2 className='font-extrabold text-lg  text-purple-600'>Banner Image Upload </h2>
                    <hr />

                    <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                        <div className='w-1/2'>
                            <Form.Item name="alt_text" label="Alt Text" rules={[{ required: true, message: 'Missing Alt Text' }]} onChange={handleOnchangeInput}>
                                <Input type='text' />
                            </Form.Item>

                            <Form.Item name="redirect_url" label="Redirect URL" onChange={handleOnchangeInput} 
                                    rules={[{ required: true, message: 'Missing Redirect URL' }, { type: 'url', warningOnly: true }]}>
                                <Input type='text' />
                            </Form.Item>

                            <Form.Item name="is_active" label="Is Active"  onChange={handleChangeOnCheckBox}>
                                <Checkbox />
                            </Form.Item>



                            <Form.Item name="file_name" label="Image" >
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

export default Upload;