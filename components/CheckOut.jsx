import { Button, Form, Input, Radio, Spin, Modal } from 'antd'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { BsEnvelope, BsEnvelopeFill } from 'react-icons/bs';
import { FaCity, FaLandmark, FaRegAddressCard } from 'react-icons/fa';
import Scrollbars from 'react-custom-scrollbars-2';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { message } from 'antd';


const CheckOut = (props) => {
    const { ShippingDetail } = props
    const [form] = Form.useForm();
    const router = useRouter()
    const base_url = process.env.baseURL
    const [CheckOuType, setCheckOuType] = useState()
    const [ProductInFormation, setProductInFormation] = useState({})
    const [ProductItemDetails, setProductItemDetails] = useState({})
    const [CurrentPhotoToDisplay, setCurrentPhotoToDisplay] = useState()

    const [SingleOrderInformation, setSingleOrderInformation] = useState({
        order_qty: 1
    })

    const [CartOrderInformation, setCartOrderInformation] = useState([])



    const [CheckOutCart, setCheckOutCart] = useState([])
    const [UserCart, SetUserCart] = useState([])

    const [ShipLocationDetails, setShipLocationDetails] = useState({})


    //modal states

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [PaymentMethodId, setPaymentMethodId] = useState()
    const [PaymentStatus, setPaymentStatus] = useState(false)




    useEffect(() => {
        if (router.query.product !== undefined && router.query.sku !== undefined && router.query.type == 'only-product-checkout') {
            setCheckOuType(router.query.type)
            ProceedSingleProductCheckOut(router.query.product, router.query.sku)
        }
        else if (router.query.type == 'cart-checkout') {
            setCheckOuType(router.query.type)
            ProceedCartCheckOut();
        }

    }, [router.isReady])


    // useEffect(() => {
    //     console.log(SingleOrderInformation);
    //     console.log(ShipLocationDetails);

    // }, [SingleOrderInformation, ShipLocationDetails])



    const ProceedSingleProductCheckOut = (slug, sku) => {
        axios.get((`${base_url}/api/get-full-product/?slug=${slug}`)).then(res => {
            let result = res.data.results[0]
            if (result?.id > 0) {

                setSingleOrderInformation((preval) => {
                    return {
                        ...preval, product_id: result.id
                    }
                })
                FetchProductitemDetail(parseInt(sku))
                setProductInFormation(result)

            }
        })
    }


    const ProceedCartCheckOut = () => {
        axios.get('/api/user/cart').then(res => {
            let cart = res.data
            SetUserCart(cart.results)
            let valid_cart_items = cart.results.filter(item => item.cart_qty <= parseInt(item.stock_qty))

            let checkout_cart = valid_cart_items.map(item => {
                return (
                    {
                        cart_id: item.id,
                        product_id: item.product_id,
                        product_inventory_id: item.product_inventory_id,
                        order_qty: item.cart_qty
                    }
                )
            })

            setCheckOutCart(valid_cart_items)
            setCartOrderInformation(checkout_cart)

        })

    }

    const FetchProductitemDetail = (id) => {
        axios.get(`${base_url}/api/get-product-inventory/${id}`).then((response) => {
            setProductItemDetails(response.data)
            setSingleOrderInformation((preval) => {
                return { ...preval, product_inventory_id: response.data.id }
            })
            setCurrentPhotoToDisplay(response.data.images[0])


        }).catch(err => {
            message.info('NO ITEM FOR CHECKOUT')
        })

    }


    const handleChangeInCurrentShowing = (ind) => {
        setCurrentPhotoToDisplay(ProductItemDetails.images[ind])
    }


    const handlePlaceOrder = (checkout_type) => {
        let checkout_data;
        if (checkout_type == 'only-product-checkout') {
            checkout_data = {
                'order': SingleOrderInformation,
                'delivery_address': ShipLocationDetails,
                'order_type': checkout_type

            }
        }
        else {
            checkout_data = {
                'order': CartOrderInformation,
                'delivery_address': ShipLocationDetails,
                'order_type': checkout_type

            }
        }
        console.log(checkout_data);

        axios.post('/api/user/placeorder', checkout_data).then(res => {
            let resData = res.data

            if (resData.status == 200) {
                message.success(resData.msg);
                setOpen(false);
                setConfirmLoading(false);
                router.push('/')
                // router.reload()
            }
            else {
                message.error(resData.msg)
                setOpen(false);
                setConfirmLoading(false);
            }

        }).catch(err => {
            message.error(err.response.data.error)
            setOpen(false);
            setConfirmLoading(false);
        })

        // console.log(checkout_data);

    }


    const handleOnchangeInput = (e) => {
        let { value, id } = e.target
        setShipLocationDetails(preval => {
            return {
                ...preval,
                [id]: value
            }
        })
    }

    const LoadDefaultAddress = () => {
        setShipLocationDetails(ShippingDetail[0])
        form.setFieldsValue(ShippingDetail[0])

        console.log('loading');
    }



    // modal states and functions

    const showModal = () => {
        setOpen(true);
    };


    const handleOk = () => {
        setConfirmLoading(true);
        handlePlaceOrder(CheckOuType)
    };


    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const changePaymentMethodId = ({ target: { value } }) => {
        console.log(value);
        setPaymentMethodId(value)
        if (CheckOuType == 'only-product-checkout') {
            setSingleOrderInformation(preval => {
                return { ...preval, payment_method: value, is_payment_completed: false }
            })
        }
        else if (CheckOuType == 'cart-checkout') {
            let checkout_cart = CartOrderInformation.map(item => {

                return (
                    {
                        cart_id: item.cart_id,
                        product_id: item.product_id,
                        product_inventory_id: item.product_inventory_id,
                        order_qty: item.order_qty,
                        payment_method: value,
                        is_payment_completed: false
                    }
                )
            })
            console.log('checkoutCart', checkout_cart);
            setCartOrderInformation(checkout_cart)

        }



    };

    const optionsWithDisabled = [
        { label: 'Cash On Delivery', value: '1' },
        { label: 'E-Sewa', value: '2', disabled: true },
        { label: 'Khalti', value: '3', disabled: true }
    ]


    return (
        <div>

            {router.isReady && CheckOuType !== undefined && (CurrentPhotoToDisplay !== undefined || CheckOutCart.length > 0) ?

                <div>
                    <Modal
                        title="Choose Payment Options"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="submit"
                                type="primary"
                                loading={confirmLoading}
                                onClick={handleOk}
                                disabled={PaymentMethodId == undefined || null || ''}
                            // disabled={changePaymentMethodId == undefined|| null ? true: false}
                            >
                                Submit
                            </Button>
                        ]}
                    >
                        <Radio.Group name="payment_method"
                            // defaultValue={1}
                            options={optionsWithDisabled}
                            onChange={changePaymentMethodId}
                            value={PaymentMethodId}

                        >


                        </Radio.Group>
                    </Modal>



                    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                        <a className="text-2xl font-bold text-gray-800">Checkout</a>
                        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                            <div className="relative">
                                <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
                                        ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg
                                            ></a>
                                        <span className="font-semibold text-gray-900">Shop</span>
                                    </li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                                        <span className="font-semibold text-gray-900">Shipping</span>
                                    </li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                                        <span className="font-semibold text-gray-500">Payment</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                        <div className="px-4 pt-8">
                            {
                                UserCart.length !== CheckOutCart.length ?
                                    <p className='font-sans text-center bg-yellow-100 rounded-md py-1 font-semibold'>Out Of Stock Cart Items Are Not Included On Checkout Process!!!</p>
                                    : <></>
                            }
                            <p className="text-xl font-medium">Order Summary</p>
                            <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">


                                {/* <Scrollbars autoHeight autoHeightMin={550}>

                                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                                        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
                                            <span className="float-right text-gray-400">42EU - 8.5US</span>
                                            <p className="text-lg font-bold">$138.99</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                                        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
                                            <span className="float-right text-gray-400">42EU - 8.5US</span>
                                            <p className="mt-auto text-lg font-bold">$238.99</p>
                                        </div>
                                    </div>
                                </Scrollbars> */}


                                {
                                    CurrentPhotoToDisplay !== undefined ?

                                        // for single item based check out 
                                        <div className='flex flex-col space-y-8 lg:space-y-20'>
                                            <div className='w-full lg:w-2/3 sm:w-2/3 md:m-auto md:w-1/3 lg:m-0'>
                                                <img alt="ecommerce" className="object-cover object-center rounded" src={`${base_url}${CurrentPhotoToDisplay?.file_name}`} />
                                                <div className='grid grid-cols-4 mt-5 md:h-[50px]  justify-center  gap-3 '>
                                                    {ProductItemDetails?.images.map((item, ind) => (
                                                        < div className='border-purple-300  border cursor-pointer' key={ind + 100000} onClick={() => { handleChangeInCurrentShowing(ind) }}>
                                                            <img src={`${base_url}${item.file_name}`} alt="product images" className='h-full w-full' />
                                                        </div>

                                                    ))
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <p className='lg:text-2xl lg:font-bold mb-2 '>{ProductInFormation.product_name}</p>
                                                <p className='text-lg m-0 text-gray-400'>Discount:${ProductItemDetails.discount}</p>
                                                <p className='text-lg text-gray-400'>Retail Price:${ProductItemDetails.retail_price}</p>
                                            </div>

                                        </div>
                                        :
                                        <>
                                            <Scrollbars autoHeight autoHeightMin={550}>

                                                {
                                                    // for whole cart checkout 
                                                    CheckOutCart.map((item, ind) => {
                                                        return (
                                                            <div className="flex flex-col rounded-lg bg-white sm:flex-row" key={item.id}>
                                                                <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`${base_url}${item.images[0]}`} alt="" />
                                                                <div className="flex w-full flex-col px-4 py-4">
                                                                    <span className="font-semibold">{item.product_name}</span>
                                                                    <div className='flex space-x-4'>
                                                                        <span className="float-right text-gray-400">Discount: {item.discount}</span>
                                                                        <span className="float-right text-gray-400">Quantity: {item.cart_qty}</span>
                                                                    </div>
                                                                    <p className="md:text-lg  text-sm pt-3 font-bold">Net Price: {item.retail_price}</p>
                                                                </div>
                                                            </div>
                                                        )


                                                    })

                                                }
                                            </Scrollbars>
                                        </>



                                }

                            </div>
                        </div>

                        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                            <div className='md:flex pb-4 md:pb-0'>
                                <div>
                                    <p className="text-xl font-medium">Shipping Details</p>
                                    <p className="text-gray-400">Complete your order by providing your Shipping details.</p>
                                </div>

                                {
                                    ShippingDetail.length > 0 ?
                                        <div>
                                            <Button className='flex items-center text-sm bg-gray-700 text-white hover:bg-purple-500 border-0 ' onClick={LoadDefaultAddress}>Load Default Address</Button>
                                        </div>
                                        :
                                        <></>
                                }
                            </div>
                            <div className=''>
                                <Form layout="vertical" form={form} onFinish={showModal} >

                                    {/* full name */}
                                    <Form.Item
                                        name="full_name"
                                        label="Full Name :"
                                        onChange={handleOnchangeInput}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter Your Email!!'
                                            }
                                        ]}
                                    >
                                        <Input className="w-full rounded-md border border-gray-200  py-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder='Your Full Name' prefix={<AiOutlineUser className='text-gray-500' />} />
                                    </Form.Item>

                                    <Form.Item

                                        name="address"
                                        label="Address :"
                                        onChange={handleOnchangeInput}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter Your Address!!'
                                            }
                                        ]}
                                    >
                                        <Input className="w-full rounded-md border border-gray-200  py-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder='Eg: Kathmandu -32, Subidhanagar, Tinkune' prefix={<FaRegAddressCard className='text-gray-500' />} />
                                    </Form.Item>

                                    <Form.Item
                                        name="landmark"
                                        label="Landmark"
                                        onChange={handleOnchangeInput}
                                    >
                                        <Input className="w-full rounded-md border border-gray-200  py-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder='Eg: Beside  Kantipur Television' prefix={<FaLandmark className='text-gray-500' />} />
                                    </Form.Item>

                                    <div className="lg:flex lg:justify-between lg:space-x-24">
                                        {/* email input  */}
                                        <Form.Item
                                            className="lg:w-1/2"
                                            name="postal_code"
                                            label="Postal Code"
                                            onChange={handleOnchangeInput}
                                        >
                                            <Input className=" w-full rounded-md border border-gray-200 py-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder='Postal Code' prefix={<BsEnvelope className='text-gray-500' />} />
                                        </Form.Item>


                                        {/* first name input  */}
                                        <Form.Item
                                            className="lg:w-1/2"
                                            name="city"
                                            label="City"
                                            onChange={handleOnchangeInput}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please Enter Your city name!!'

                                                },
                                            ]}
                                        >
                                            <Input className=" w-full rounded-md border border-gray-200 py-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder='Your City ' prefix={<FaCity className='text-gray-500' />} />
                                        </Form.Item >
                                    </div>

                                    <div className="mt-6 border-t border-b py-2">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                            <p className="font-semibold text-gray-900">$399.00</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900">Shipping</p>
                                            <p className="font-semibold text-gray-900">$8.00</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Total</p>
                                        <p className="text-2xl font-semibold text-gray-900">$408.00</p>
                                    </div>

                                    <Button htmlType="submit" className=" w-full rounded-md text-center  font-medium  items-center text-sm bg-gray-700 text-white hover:bg-purple-500 border-0" >Place Order</Button>
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='text-center space-y-4 flex flex-col items-center h-96  justify-center'>
                    <Spin size='large' spinning={true} />
                    <Button className=" w-1/2 rounded-md text-center  font-medium  items-center text-sm bg-gray-700 text-white hover:bg-purple-500 border-0">NO Item to Check out(Return Home)</Button>

                </div>
            }
        </div >
    )
}

export default CheckOut