import { Col, Row, Space, Select, Tooltip, Image, Form, InputNumber, Button, message } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import axios from 'axios'
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import React from 'react'
import { useEffect, useState } from 'react'


const AddStockPage = (props) => {
    const { FetchedProduct, setFetchedProductItems, FetchedProductItems, base_url, setStockInventoryData , StockInventoryData, setFetchedProduct} = props
    const [form] = Form.useForm();

    const [SelectedProductItem, setSelectedProductItem] = useState(0)
    const [ProductItemAttributes, setProductItemAttributes] = useState()
    const [ProductItemDetails, setProductItemDetails] = useState()
    const [visible, setVisible] = useState(false);
    const [ProductItemStockQty, setProductItemStockQty] = useState()
    const [uploading, setUploading] = useState(false);


    useEffect(() => {
        if (FetchedProduct !== undefined) {
            setFetchedProductItems(FetchedProduct.product_items)
        }

    }, [FetchedProduct])




    const onFinish = () => {
        handleSaveStock()

    }

    const handleSaveStock = ()=>{
        setUploading(true)
        axios.post(`${base_url}/api/stock/add-stock/`, StockInventoryData).then(
            (res)=>{
                let result  =  res.data
                if (result.status == 200){
                    message.success(result.msg)
                }
                else{
                    message.error('SOMETHING WENT WRONG WHILE ADDING STOCK!!')

                }
                setUploading(false)
                setFetchedProduct()

            }
        ).catch(
            (err)=>{
            console.log(err);
            if (err.message){
                message.error(err.message)
            }
            else(
                message.error('BAD REQUEST ON ADDING STOCK QUANTITY')
            )
            setUploading(false)

            }
        )
    }



    const onFinishFailed = () => {
        console.log('on finish failed');
    }


    const handleSelectChange = (e) => {
        setStockInventoryData((preval) => {
            return { ...preval, product_inventory_id: e }
        })
        setSelectedProductItem(e);
        FetchProductitemDetail(e);
        FetchProductAttributeValue(e);
        FetchStockQtyOfProductItem(e);
    }


    const FetchProductAttributeValue = (id) => {

        axios.get(`${base_url}/api/get-item-attribute-value/?product_item_id=${id}`).then((response) => {

            setProductItemAttributes(response.data)
        }).catch(err => {
            message.error('Error On Fetching Attribute Data')
        })

    }

    const FetchStockQtyOfProductItem = (id) => {

        axios.get(`${base_url}/api/stock/get-stock-qty/?product_item_id=${id}`).then((response) => {
            setProductItemStockQty(response.data)
        }).catch(err => {
            message.error('Error on Fetching Stock Quantity!')
        })

    }

    const FetchProductitemDetail = (id) => {
        axios.get(`${base_url}/api/get-product-inventory/${id}`).then((response) => {
            setProductItemDetails(response.data)
        }).catch(err => {
            message.error('Error on Fetching Item Details!')
        })

    }
    const handleInputChange = (event) => {
        let value = event.target.value
        let key = event.target.id
        setStockInventoryData((preval) => {
            return {
                ...preval,
                [key]: value
            }
        })


    }



    return (
        <>
            <div className=''>
                <h3 className='font-bold m- uppercase text-xl text-gray-400 leading-none'>{FetchedProduct.product_name}</h3>
                <div className='w-2/3 '>
                    <p className='text-sm text-gray-600 leading-normal'>{FetchedProduct.description} </p>
                    <hr />
                </div>
            </div>
            <div className='flex   space-x-4'  >
                <div className=' flex justify-between w-2/3 border-r-2'>
                    <div>
                        <h4 className='leading-none text-md text-gray-600 font-semibold'>Choose Product Item</h4>
                        <Select className='w-72 first-letter:capitalize'
                            name="product_item"
                            value={FetchedProductItems.id}
                            onChange={handleSelectChange}
                        >
                            {
                                FetchedProductItems.map((attr, ind) => {
                                    return <Select.Option value={attr.id} key={ind} className='first-letter:capitalize'>
                                        <h1 className='font-semibold' >{attr.sku}</h1>
                                        <Tooltip s placement='right' title={`Item Id: ${attr.id}, retail price: ${attr.retail_price}, store Price: ${attr.store_price}`}>
                                            <span className='leading-none'>
                                                Item Id: {attr.id}, retail price: {attr.retail_price}, store Price: {attr.store_price}
                                            </span>
                                            <hr />
                                        </Tooltip>
                                    </Select.Option>
                                })
                            }

                        </Select>
                        {
                            SelectedProductItem > 0 ?
                                <p className=' text-sm text-gray-400 m-0 leading-0'>Item Id: {SelectedProductItem}</p>
                                : <></>
                        }
                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" className="">
                            <Form.Item name="stock_qty" label="Quantity" rules={[{ required: true, message: 'Missing Quantity' }]} onChange={handleInputChange} extra={SelectedProductItem > 0 && ProductItemStockQty !== undefined? `Qty Available: ${ProductItemStockQty[0].stock_qty}` : `Qty Available: 0`}>
                                <InputNumber type='number' />
                            </Form.Item>
                            <Form.Item name="statement_reference" label="Reference" rules={[{ required: true, message: 'Missing Reference' }]} onChange={handleInputChange}>
                                <TextArea type='number' rows={4} />
                            </Form.Item>
                            <Button type="primary" htmlType="submit"
                                disabled={SelectedProductItem <= 0}
                                loading={uploading}
                            >
                                Submit
                            </Button>

                        </Form>
                    </div>


                    {ProductItemDetails ?

                        <div>

                            <Image
                                preview={{
                                    visible: false,
                                }}
                                width={200}
                                src={`${base_url}${ProductItemDetails.images[0].file_name}`}
                                onClick={() => setVisible(true)}
                            />
                            <div
                                style={{
                                    display: 'none',
                                }}
                            >
                                <Image.PreviewGroup
                                    preview={{
                                        visible,
                                        onVisibleChange: (vis) => setVisible(vis),
                                    }}
                                >

                                    {ProductItemDetails.images.map((item, ind) => {
                                        return <Image src={`${base_url}${item.file_name}`} key={ind} />

                                    })

                                    }
                                </Image.PreviewGroup>
                            </div>
                        </div>

                        : <></>

                    }


                </div>
                <div className='border border-gray-50  w-1/3 space-y-4 '>
                    <h2 className='font-extrabold text-base uppercase text-center py-2 bg-slate-200 border-b-2'>Product Details</h2>
                    <div className='px-5 grid grid-cols-2'>
                        <p className='font-semibold'>Brand: {FetchedProduct.brand_id.brand_name}</p>
                        <p className='font-semibold'>Cateogry: {FetchedProduct.category_id.category_name}</p>
                        <p className='font-semibold'>Sub Category: {FetchedProduct.sub_category_id.sub_category_name}</p>
                        <p className='font-semibold'>Status: {FetchedProduct.is_active ? 'Active' : 'Inactive'}</p>
                    </div>

                    <div className='font-semibold text-base text-center bg-slate-100 uppercase'>Product Item Details</div>

                    {
                        ProductItemDetails ?
                            <div className='px-5 grid grid-cols-2'>
                                <p className='font-semibold'>SKU: {ProductItemDetails.sku}</p>
                                <p className='font-semibold'>Store Price: {ProductItemDetails.store_price}</p>
                                <p className='font-semibold'>Discount: {ProductItemDetails.discount}</p>
                                <p className='font-semibold'>Retail Price: {ProductItemDetails.retail_price}</p>
                                <p className='font-semibold'>Status: {ProductItemDetails.is_active ? 'Active' : 'Inactive'}</p>
                                {
                                    SelectedProductItem > 0 && ProductItemStockQty !== undefined ?
                                        <p className='font-semibold'>Qty Available: {ProductItemStockQty[0].stock_qty}</p>
                                        : <></>
                                }
                            </div>
                            :
                            <></>
                    }

                    {
                        ProductItemAttributes ?
                            <div className='px-5 grid grid-cols-2'>
                                {
                                    ProductItemAttributes.map((item, ind) => {
                                        return <p className='font-semibold' key={ind}>{item.attribute_name}: {item.attribute_value}</p>
                                    })


                                }

                            </div>
                            :
                            <></>
                    }
                </div>

            </div>


        </>
    )
}

export default AddStockPage