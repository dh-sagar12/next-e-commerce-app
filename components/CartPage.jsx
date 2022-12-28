import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlinePlus, AiOutlineMinus, AiFillMinusCircle } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { increasecartItemvalue, decreasecartItemvalue, removeItem } from '../redux/cart/cartSlice';
import Scrollbars from 'react-custom-scrollbars-2';
import axios from 'axios';
import { message } from 'antd';



const CartPage = () => {
    const Cart = useSelector(state => state.cartSlice.cart)
    const [subTotalPrice, setsubTotalPrice] = useState(0)
    const dispatch = useDispatch();
    const base_url = process.env.baseURL
    useEffect(() => {
        subTotalCartAmount()
    }, [Cart])



    const increaseCartValue = (id, prevCount) => {
        let cartData = {
            id: id,
            cart_qty: prevCount + 1
        }

        axios.put('/api/user/cart/', cartData).then(res => {
            let response = res.data
            return response
        }).catch(err => {
            if (err?.response?.data?.status == 400) {
                message.error(err?.response?.data?.msg)
            }
        })
        dispatch(increasecartItemvalue(id))

    }

    const decreaseCartValue = (id, cartvalue) => {
        if (cartvalue > 1) {
            let cartData = {
                id: id,
                cart_qty: cartvalue - 1
            }

            axios.put('/api/user/cart/', cartData).then(res => {
                let response = res.data
                return response
            }).catch(err => {
                if (err?.response?.data?.status == 400) {
                    message.error(err?.response?.data?.msg)
                }
            })
            dispatch(decreasecartItemvalue(id))
        }
    }

    const removecartItems = (cartId) => {
        axios.delete('/api/user/cart/', { data: { id: cartId } }).then(res => {
            let response = res.data
            if (response.status == 200) {
                dispatch(removeItem(cartId))
            }
            return response
        }).catch(err => {
            if (err?.response?.data?.status == 400) {
                message.error(err?.response?.data?.msg)
            }
        })
    }

    const subTotalCartAmount = () => {
        let SubTotalPrice = 0
        Cart.forEach(item => {
            SubTotalPrice = SubTotalPrice + (item.store_price * item.cart_qty)
        });
        setsubTotalPrice(SubTotalPrice)

    }
    return (
        <>
            <div className="min-h-screen md:mx-7">
                <div className=''>
                    <h2 className='text-center font-bold text-3xl py-1'>
                        My Cart
                    </h2>
                </div>



                {Cart.length > 0 ?
                    <div className="flex flex-col justify-center items-center md:items-start  mx-4 md:flex-row md:justify-between md:mx-1">
                        <div className="items-box  md:flex-grow lg:flex-auto mb-8 md:w-1/2 ">
                            <Scrollbars autoHeight autoHeightMin={700}>
                                {
                                    Cart.map((cartItem) => {
                                        return (
                                            <div key={cartItem.id}>
                                                <div className="md:flex items-center py-8 border-t border-gray-200">
                                                    <div className="md:w-1/3 md:h-56">
                                                        <img src={`${base_url}${cartItem.images[0]}`} alt className="w-full h-full object-center object-cover" />
                                                    </div>
                                                    <div className="md:pl-3 md:pr-4 md:w-3/4 w-full">
                                                        <p className="text-xs p-0 m-0 text-gray-800 md:pt-0 pt-4">{cartItem.sku}</p>
                                                        <div className="flex items-center justify-between w-full ">
                                                            <p className="text-base font-black leading-none text-gray-800">{cartItem.product_name}</p>
                                                            <div className='text-base flex space-x-2 mt-1 py-2 px-1'>
                                                                <button className={cartItem.cart_qty > 1 ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => decreaseCartValue(cartItem.id, cartItem.cart_qty)}><AiOutlineMinus /></button>
                                                                <input type="text" className='w-12 pl-5 border border-purple-400' value={cartItem.cart_qty} readOnly />
                                                                <button onClick={() => increaseCartValue(cartItem.id, cartItem.cart_qty)}><AiOutlinePlus /></button>
                                                            </div>
                                                        </div>
                                                        {
                                                            Object.keys(cartItem.product_attributes).map((keyname, i) => (
                                                                <p className="text-xs leading-3 text-gray-600 pt-2">{keyname}: {cartItem.product_attributes[keyname]} </p>
                                                            ))

                                                        }
                                                        <div className="flex items-center justify-between pt-5 pr-6">
                                                            <div className="flex itemms-center">
                                                                <button className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={() => removecartItems(cartItem.id)}>Remove</button>
                                                            </div>
                                                            <p className="text-base font-black leading-none text-gray-800">$9,000</p>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        )
                                    })
                                }
                            </Scrollbars>
                        </div>
                        <div className="bill-box border rounded-md bg-purple-100 w-full p-4 flex flex-col sm:px-16 sm:space-y-5 sm:w-5/6 sm:mx-auto md:w-3/4 md:mx-0 md:px-7 md:py-5 lg:w-1/3">
                            <div className="box flex  bg-purple-50 w-full px-4 py-3 flex-col rounded-lg sm:py-8 ">
                                <div className="head py-4   ">
                                    <h3 className='font-bold pb-2 border-b-2 border-purple-700 indent-3 md:indent-0'>Estimated Cart Summary:</h3>
                                </div>
                                <div className="subtotal space-y-3 sm:space-y-5">
                                    <p className='text-lg'>Subtotal: <span className='font-semibold'>${subTotalPrice}</span> </p>
                                    <p className='text-lg'>Delivery: <span className='font-semibold text-base text-orange-500'>Free</span></p>
                                    <p className='text-lg pb-2 border-b-2 border-purple-700'>Tax: <span className='font-semibold'>${(subTotalPrice * 0.13).toFixed(2)}</span></p>
                                    <p className='text-lg indent-1'>Total: <span className='font-semibold'>${(subTotalPrice + (subTotalPrice * 0.13)).toFixed(2)}</span></p>
                                </div>

                            </div>
                            <div className='mt-3'>
                                <button className='w-full px-4 py-3 bg-purple-500 text-lg hover:bg-purple-600 font-semibold  duration-100 transition-all text-white shadow-md rounded-md'>CheckOut</button>
                            </div>
                        </div>
                    </div>
                    :

                    <>
                        <div className='text-center flex items-center justify-center flex-col'>
                            <p className='text-3xl my-20 text-slate-400'>No Items in cart</p>
                            <Link href={'/'}><a className='py-2 px-5 text-white font-[inherit] text-lg rounded-md shadow-md hover:bg-purple-400  transition-all ration-200 bg-purple-500'>Shop</a></Link>
                        </div>
                    </>

                }


            </div>

        </>
    )
}

export default CartPage



