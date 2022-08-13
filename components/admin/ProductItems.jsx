import { Checkbox, Form, Input, InputNumber, Row, Space, Select, Button, message } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { BiSitemap } from 'react-icons/bi'
import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Item from 'antd/lib/list/Item';
import ImageUploader from './ImageUploader';
import Router from 'next/router'

import { addProduct } from '../../redux/products/addProductSlice';
import axios from 'axios';




const { Option } = Select;


const ProductItems = (props) => {

    const newProduct = useSelector(state => state.newProductSlice.new_product)
    
    // const attributevalue = []

    const dispatch = useDispatch()
    const [form] = Form.useForm();
    // const [isDefaultChecked, setIsDefaultChecked] = useState(true)
    // const [isActiveChecked, setIsActiveChecked] = useState(true)
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
        console.log(attributeValue);
        setProductItemState((preval) => {
            console.log('running');
            return { ...preval, attributeValue }
        })
    }, [attributeValue])


    useEffect(() => {
        setProductItemState((preval) => {
            return { ...preval, fileList }
        })
    }, [fileList])


    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/get-attribute/').then(res=> {
        setFetchedAttributes(res.data)
      }).catch(e=>{
        message.error(e)
      })
    }, [])
    

    useEffect(() => {
        // console.log(newProduct);
    }, [newProduct])


    useEffect(() => {
    //  console.log(ProductItemState);
    }, [ProductItemState])
    








    const onFinish = () => {
        handleSaveProduct()

    }


    const onFinishFailed = () => {
        // console.log('onFinishFailed');
        // message.error('Product added failed')

    }

    let checkForDuplicate = (KeyvalueAttributePair) => {
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

        // attributeValue.forEach((elem)=>{

        //     if(elem.attribute_id === KeyvalueAttributePair.attribute_id){
        //         return true
        //     }
        //     else{
        //         return false
        //     }
        // })
    }

    const getAttributeNameViaId =  (id)=>{
        let item  = FetchedAttributes.find(item=> item.id=== id)
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
        // console.log(elem);
        let Filteredlist = attributeValue.filter(item => {
            return item.attribute_id !== elem.attribute_id
        })
        setAttributeValue(()=> Filteredlist)


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

    const handleSaveProduct = () => {
        console.log(ProductItemState);
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('uploaded_images', file);
        });
        
        attributeValue.forEach((pair)=>{
            let attr_value =  JSON.stringify(pair)
            formData.append('attributes_value', attr_value)
        })
        formData.append('product_id', 1)
        formData.append('store_price', ProductItemState.store_price)
        formData.append('discount', ProductItemState.discount)
        formData.append('retail_price', ProductItemState.retail_price)
        formData.append('is_active', ProductItemState.is_active)
        formData.append('is_default', ProductItemState.is_default)

        setUploading(true);

        fetch('http://localhost:8000/api/add-product-inventory/', {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == 200) {
                    message.success(data.success)
                    setFileList([]);
                    setProductItemState({})
                    setAttributeValue([])
                    form.resetFields()
                    dispatch(addProduct([]))
                    Router.push('/admin/product')

                }
                else {
                    // console.log(data.errors)
                    for (let [key, value] of Object.entries(data.errors)) {
                        message.error(`${key}:${value}`)
                    }
                }

            })
            .catch((e) => {
                message.error(`upload failed with error${e}`);
            })
            .finally(() => {
                setUploading(false);
            });

        // dispatch(addProduct([]))

    }

    const handleOnchangeInput = (e) => {
        setProductItemState(form.getFieldsValue(e))
        setProductItemState((preval) => {
            return { ...preval, attributeValue, fileList }
        })

    }

    // form.getFieldValue(e) , ...attributeValue



    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" className="flex" initialValues={{ is_active: true, is_default: true }} >
                <div className="w-1/2">
                    <Form.Item name="product_name" label="Product Name" initialValue={newProduct[0].product_name}>
                        <Input disabled={true}   />
                    </Form.Item>
                    <Row >
                        <Space size={'large'}>
                            <Form.Item name="store_price" label="Store Price" rules={[{ required: true, message: 'Missing Store Price' }]}>
                                <InputNumber type='number' onChange={() => handleOnchangeInput(Item.name)} />
                            </Form.Item>

                            <Form.Item name="discount" label="Discount( in %)" initialValue={0}>
                                <InputNumber type='number' onChange={() => handleOnchangeInput(Item.name)} />
                            </Form.Item>
                            <Form.Item name="retail_price" label="Retail Price" rules={[{ required: true, message: 'Missing Retail Price' }]}>
                                <InputNumber type='number' onChange={() => handleOnchangeInput(Item.name)} />
                            </Form.Item>
                        </Space>
                    </Row>
                    <br />
                    <Row>
                        <Space size={'large'}>

                            <Form.Item name="is_default" label="Is Default" valuePropName='checked'>
                                <Checkbox onChange={() => handleOnchangeInput(Item.name)} />
                            </Form.Item>

                            <Form.Item name="is_active" label="Is Active" valuePropName='checked'>
                                <Checkbox onChange={() => handleOnchangeInput(Item.name)} />
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
                                // onChange={() => handleOnchangeInput(Item.name)}
                                >
                                    {
                                        FetchedAttributes.map((attr, ind)=>{
                                            return  <Option value={attr.id} key={attr.id} className='first-letter:capitalize'>{attr.attribute_name}</Option>
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
                        {
                            attributeValue.map((elem, ind) => {
                                return <Row key={ind + 1}>
                                    <div className='flex justify-between bg-gray-50 w-full px-3.5 py-1 items-center'>
                                        <div>{getAttributeNameViaId(elem.attribute_id)}</div>
                                        <div>{elem.attribute_value}</div>
                                        <div>
                                            <CloseOutlined className='text-red-600' onClick={() => handleRemoveAttribute(elem)} />
                                        </div>
                                    </div>
                                </Row>
                            })
                        }

                    </div>

                    <Button htmlType='submit'
                        loading={uploading}
                        disabled={fileList.length === 0}
                        className='flex items-center border-gray-50 hover:text-purple-500 hover:border-purple-400 text-gray-600 space-x-4 w-full justify-center bg-purple-50'>
                        <BiSitemap /> Save Product
                    </Button>


                    {/* <Space size={'large'}>
                        <Button type="primary" onClick={handleProductAddition} className='flex items-center bg-slate-800 border-none hover:bg-purple-500'>
                            Next <ArrowRightOutlined />
                        </Button>

                        <Link href={'/admin/product'}>
                            <Button type="primary" className='flex items-center bg-slate-800 border-none hover:bg-purple-500'>
                                <CloseSquareOutlined /> Cancel
                            </Button>
                        </Link>


                    </Space> */}
                </div>


                <Row className='ml-24 w-1/2'>
                    <Form.Item label={'Images(max: 3 & min: 1(required)'} >
                        <ImageUploader fileList={fileList} setFileList={setFileList} />
                        {/* <InputNumber type='number' onChange={() => handleOnchangeInput(Item.name)} /> */}

                    </Form.Item>
                </Row>
            </Form>
        </>
    )
}

export default ProductItems

// onChange={handleChangeOnValue} value={KeyvalueAttributePair.value