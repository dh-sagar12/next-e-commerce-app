import { Checkbox, Form, Input, Tooltip, InputNumber, Row, Space, Select, Button, message, Spin, Image, Popconfirm } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { BiSitemap } from 'react-icons/bi'
import React from 'react'
import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router'
import axios from 'axios';
import ImageUploader from '../../../../components/admin/ImageUploader';






const { Option } = Select;


const AddProductItem = (props) => {

    const router = useRouter()
    console.log(router.query)
    console.log('props', props);
    const base_url = process.env.baseURL

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




    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get-attribute/').then(res => {
            setFetchedAttributes(res.data)

        }).catch(e => {
            message.error(e.message)
        })



    }, [])


    useEffect(() => {
        form.setFieldsValue({ 'product_name': router.query.product_name })
        form.setFieldsValue({ 'is_active': true })

        setProductItemState(
            {
                'product_id': parseInt(router.query.product_id),
                'is_active': true,
                'discount': parseInt(0)
            }
        )
        if (router.query.product_id == undefined || router.query.product_name == undefined) {
            message.error('Product Matching Query Doesnot Exists!!!')
            Router.push('/admin/product')
        }
    }, [router.query])





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
        setAttributeValue(() => Filteredlist)



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

        attributeValue.forEach((pair) => {
            let attr_value = JSON.stringify(pair)
            formData.append('attributes_value', attr_value)
        })
        for (const [key, value] of Object.entries(ProductItemState)) {
            formData.append(key, value)
        }


        setUploading(true);

        fetch(`${base_url}/api/add-product-inventory/`, {
            method: 'POST',
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
                    else if (data.detail !== undefined) {
                        message.error(data.detail)
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
                    Add New Product Items
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
                            disabled={fileList.length === 0}
                            className='flex items-center border-gray-50 hover:text-purple-500 hover:border-purple-400 text-gray-600 space-x-4 w-full justify-center bg-purple-50'>
                            <BiSitemap /> Save Product
                        </Button>
                    </div>


                    <Row className='ml-24 w-1/2 flex flex-col'>
                        <Form.Item label={'Images(max: 3 & min: 1(required)'} >
                            <ImageUploader fileList={fileList} setFileList={setFileList} />

                        </Form.Item>


                    </Row>
                </Form>
                {/* <PreviewImages isPreviewVisible={isPreviewVisible} setIsPreviewVisible={setIsPreviewVisible}/> */}


            </div>

        </>
    )
}

export default AddProductItem