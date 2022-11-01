import { Checkbox, Form, Input, Tooltip, InputNumber, Row, Space, Select, Button, message, Spin, Image, Popconfirm } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { BiCrosshair, BiSitemap } from 'react-icons/bi'
import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Item from 'antd/lib/list/Item';
import ImageUploader from './ImageUploader';
import Router from 'next/router'
import PreviewImages from './PreviewImages';

import { addProduct } from '../../redux/products/addProductSlice';
import axios from 'axios';
import { data } from 'autoprefixer';




const { Option } = Select;


const EditProductItem = (props) => {
    const { EditPoductInventory, base_url } = props

    const [form] = Form.useForm();

    const [attributeValue, setAttributeValue] = useState([])
    const [KeyvalueAttributePair, setKeyvalueAttributePair] = useState({
        attribute_id: "",
        attribute_value: ""
    })

    const [ProductItemState, setProductItemState] = useState()
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [FetchedAttributes, setFetchedAttributes] = useState([])
    const [InitialImages, setInitialImages] = useState([])
    // const [InitialAttributeValue, setInitialAttributeValue] = useState()
    // const [isPreviewVisible, setIsPreviewVisible] = useState(false)





    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get-attribute/').then(res => {
            setFetchedAttributes(res.data)

        }).catch(e => {
            message.error(e.message)
        })

        if (EditPoductInventory) {
            console.log('EditPoductInventory', EditPoductInventory);
            form.setFieldsValue({ 'product_name': EditPoductInventory.product_id.product_name })
            form.setFieldsValue({ 'store_price': EditPoductInventory.store_price })
            form.setFieldsValue({ 'discount': EditPoductInventory.discount })
            form.setFieldsValue({ 'retail_price': EditPoductInventory.retail_price })
            form.setFieldsValue({ 'is_default': EditPoductInventory.is_default })
            form.setFieldsValue({ 'is_active': EditPoductInventory.is_active })
            setProductItemState(
                                {
                                    'id': EditPoductInventory.id,
                                    'product_id': EditPoductInventory.product_id.id
                                }
                        )






        }


    }, [])


    useEffect(() => {
        let initial_attribute_list = EditPoductInventory.attributes.map(items => {
            return {
                id: items.id,
                attribute_id: items.attribute_id,
                attribute_value: items.attribute_value
            }
        })
        setAttributeValue(initial_attribute_list)

        let initial_images_list = EditPoductInventory.images.map(items => {
            return {
                id: items.id,
                file_name: items.file_name
            }
        })
        setInitialImages(initial_images_list)

    }, [FetchedAttributes])


    useEffect(() => {
        console.log('attribute value', attributeValue);

    }, [attributeValue])


    useEffect(() => {
        console.log('product item state', ProductItemState)
    }, [ProductItemState])











    const onFinish = () => {
        handleUpdateProductItem()

    }

    const onFinishFailed = () => {
        console.warn('failed');
    }


    const checkForDuplicate = (KeyvalueAttributePair) => {
        let addedAttribute = []
        attributeValue.forEach((elem) => {
            addedAttribute.push(elem.attribute_id)
        })
        if (addedAttribute.includes(KeyvalueAttributePair.attribute_id)) {
            return true
        }
        else {
            return false
        }

    }

    const getAttributeNameViaId = (id) => {

        let item = FetchedAttributes.find(item => item.id === id)
        return item.attribute_name

    }


    const handleAddAttributeValue = (KeyvalueAttributePair) => {
        if (KeyvalueAttributePair.attribute_id !== "" && KeyvalueAttributePair.attribute_value !== "") {

            if (checkForDuplicate(KeyvalueAttributePair) == false) {
                setAttributeValue((prevalue) => {
                    return [...prevalue, KeyvalueAttributePair]
                })
                setKeyvalueAttributePair({
                    attribute_id: "",
                    attribute_value: ""
                })
            }
            else {
                message.warn('Attribute already added')
            }

        }



    }

    const handleRemoveAttribute = (elem) => {
        let Filteredlist = attributeValue.filter(item => {
            return item.attribute_id !== elem.attribute_id
        })
        let data = { id: elem.id }
        if (data.id !== undefined) {

            axios.delete(`${base_url}/api/product-attribute/`, { data }).then(res => {
                let fetched_data = res.data
                if (fetched_data.msg && fetched_data.status == 200) {
                    setAttributeValue(() => Filteredlist)
                    message.success(fetched_data.msg)
                }
                else if (fetched_data.error && fetched_data.status == 404) {
                    message.error(fetched_data.error)
                }
                else {
                    message.error(JSON.stringify(fetched_data))
                }
            }).catch(err => {
                if (err.message) {
                    message.error(err.message)
                }
                else {

                    message.error(JSON.stringify(err))
                }
            })

        }
        else {
            setAttributeValue(() => Filteredlist)
        }



    }

    const handleRemoveImage = (elem) => {

        let FilteredImageList = InitialImages.filter(item => {
            return item.id !== elem.id
        })
        let data = { id: elem.id }

        axios.delete(`${base_url}/api/upload-image/`, { data }).then(res => {
            let fetched_data = res.data
            if (fetched_data.msg && fetched_data.status == 200) {
                setInitialImages(FilteredImageList)
                message.success(fetched_data.msg)
            }
            else if (fetched_data.error && dafetched_datata.status == 404) {
                message.error(fetched_data.error)
            }
            else {
                message.error(JSON.stringify(fetched_data))
            }
        }).catch(err => {
            if (err.message) {
                message.error(err.message)
            }
            else {

                message.error(JSON.stringify(err))
            }
        })

    }

    const handleChangeOnAttribute = (e) => {
        setKeyvalueAttributePair(preval => {
            return {
                ...preval,
                attribute_id: e
            }
        })
    }

    const handleChangeOnValue = (e) => {
        let { value, name } = e.target
        setKeyvalueAttributePair(preval => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const handleUpdateProductItem = () => {
        console.log('prduct item state', ProductItemState);
        const formData = new FormData();

        if (fileList.length > 0) {
            fileList.forEach((file) => {
                formData.append('uploaded_images', file);
            });
        }
        let updated_attribute_value = attributeValue.filter(item => item.id === undefined)
        console.log('updated_attribute_value', updated_attribute_value);

        updated_attribute_value.forEach((pair) => {
            let attr_value = JSON.stringify(pair)
            formData.append('attributes_value', attr_value)
        })
        formData.append('product_item', JSON.stringify(ProductItemState))

        setUploading(true);

        fetch(`${base_url}/api/updel-product-inventory/`, {
            method: 'PUT',
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == 200) {
                    message.success(`${data.msg}`)
                    setFileList([]);
                    setProductItemState({})
                    setAttributeValue([])
                    form.resetFields()
                    Router.push('/admin/product')

                }
                else {

                    if (data.error !== undefined) {
                        message.error(`${data.error}`)
                    }
                    else {

                        message.error(`${JSON.stringify(data.errors)}`)
                    }

                }

            })
            .catch((e) => {
                message.error(`${e.error}`);
            })
            .finally(() => {
                setUploading(false);
            });


    }

  

    const handleInputChange = (event) => {
        let value = event.target.value
        let key = event.target.id
        setProductItemState((preval) => {
            return {
                ...preval,
                [key]: value
            }
        })
    }

    const handleChangeInCheckBox = (event) => {
        let value = event.target.checked
        let key = event.target.id
        setProductItemState((preval) => {
            return {
                ...preval,
                [key]: value
            }
        })
    }





    return (
        <>

            <div className="mx-6">
                <div className='text-purple-600 font-bold text-2xl leading-loose'>
                    Edit Product Items #{ }
                </div>
                <hr className='mb-5' />


                <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" className="flex"  >
                    <div className="w-1/2">
                        <Form.Item label="Product Name" name='product_name' >
                            <Input disabled={true} />
                        </Form.Item>
                        <Row >
                            <Space size={'large'}>
                                <Form.Item name="store_price" label="Store Price" rules={[{ required: true, message: 'Missing Store Price' }]} onChange={handleInputChange}>
                                    <InputNumber type='number' min={0} />
                                </Form.Item>

                                <Form.Item name="discount" label="Discount( in %)" initialValue={0} onChange={handleInputChange}>
                                    <InputNumber type='number' min={0} />
                                </Form.Item>
                                <Form.Item name="retail_price" label="Retail Price" rules={[{ required: true, message: 'Missing Retail Price' }]} onChange={handleInputChange}>
                                    <InputNumber type='number' min={0} />
                                </Form.Item>
                            </Space>
                        </Row>
                        <br />
                        <Row>
                            <Space size={'large'}>

                                <Form.Item name="is_default" label="Is Default" valuePropName='checked'
                                    onChange={handleChangeInCheckBox}>
                                    <Checkbox />
                                </Form.Item>

                                <Form.Item name="is_active" label="Is Active" valuePropName='checked'
                                    onChange={handleChangeInCheckBox}>
                                    <Checkbox />
                                </Form.Item>
                            </Space>
                        </Row>

                        <p className='font-bold first-letter:capitalize text-purple-500 text-lg'>
                            Product Attributes
                        </p>



                        <Form.Item>
                            <Input.Group className='flex w-full' >
                                <Space size='small'>
                                    <Select className='w-40 first-letter:capitalize' showSearch placeholder="Search to Select" optionFilterProp="children"
                                        filterOption={(input, option) => option.children.includes(input)} filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                                        name="attribute_id"
                                        value={KeyvalueAttributePair.attribute_id}
                                        onChange={handleChangeOnAttribute}

                                    >
                                        {
                                            FetchedAttributes.map((attr, ind) => {
                                                return <Option value={attr.id} key={attr.id} className='first-letter:capitalize'>{attr.attribute_name}</Option>
                                            })
                                        }

                                    </Select>

                                    <Input type='text' name="attribute_value" onChange={handleChangeOnValue} value={KeyvalueAttributePair.attribute_value} />
                                    <Button shape='circle'
                                        className=' bg-purple-600 text-white border-none text-center  align-middle' onClick={() => handleAddAttributeValue(KeyvalueAttributePair)}>
                                        <PlusOutlined />
                                    </Button>
                                </Space>
                            </Input.Group>
                        </Form.Item>
                        <div className='border border-gray-100  my-3' >

                            {FetchedAttributes.length > 0 ?
                                attributeValue.map((elem, ind) => {
                                    return <Row key={ind + 1}>
                                        <div className='flex justify-between bg-gray-50 w-full px-3.5 py-1 items-center'>
                                            <div>{getAttributeNameViaId(elem.attribute_id)}</div>
                                            <div>{elem.attribute_value}</div>
                                            <div>
                                                <Popconfirm title="Sure to Remove. Permanently?" onConfirm={() => handleRemoveAttribute(elem)}>
                                                    <Tooltip title='Delete Attribute'>
                                                        <CloseOutlined className='text-red-600' />
                                                    </Tooltip>
                                                </Popconfirm>
                                            </div>
                                        </div>
                                    </Row>
                                })
                                :
                                <Spin size='small'>

                                </Spin>
                            }

                        </div>

                        <Button htmlType='submit'
                            loading={uploading}
                            className='flex items-center border-gray-50 hover:text-purple-500 hover:border-purple-400 text-gray-600 space-x-4 w-full justify-center bg-purple-50'>
                            <BiSitemap /> Save Product
                        </Button>
                    </div>


                    <Row className='ml-24 w-1/2 flex flex-col'>
                        <Form.Item label={'Images(max: 3 & min: 1(required)'} >
                            <ImageUploader fileList={fileList} setFileList={setFileList} count={InitialImages.length} />

                        </Form.Item>
                        <div>
                            <h2 className='font-bold text-2xl text-purple-500 pb-3 border-b-2 border-purple-600 leading-4'>Images</h2>
                        </div>
                        <div>
                            {
                                InitialImages.map((image) => {
                                    return (
                                        <div className='flex m-1 border w-1/2 space-x-3' key={image.id} >
                                            <Image

                                                src={`${base_url}${image.file_name}`}
                                                width={200} key={image.id}>

                                            </Image>
                                            <div className='  h-1/2 my-auto'>
                                                <Popconfirm title="Sure to delete?" onConfirm={() => handleRemoveImage(image)}>
                                                    <Tooltip title='Delete Image'>
                                                        <CloseOutlined className='text-red-600 text-xl' />
                                                    </Tooltip>
                                                </Popconfirm>
                                            </div>

                                        </div>
                                    )
                                })

                            }
                        </div>


                    </Row>
                </Form>
                {/* <PreviewImages isPreviewVisible={isPreviewVisible} setIsPreviewVisible={setIsPreviewVisible}/> */}


            </div>

        </>
    )
}

export default EditProductItem