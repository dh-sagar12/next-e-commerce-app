import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlinePlus, AiOutlineMinus, AiFillMinusCircle } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { increasecartItemvalue, decreasecartItemvalue, removeItem } from '../redux/cart/cartSlice';
import Scrollbars from 'react-custom-scrollbars-2';



const CartPage = () => {
    const Cart = useSelector(state => state.cartSlice.cart)
    const [subTotalPrice, setsubTotalPrice] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        subTotalCartAmount()
    }, [Cart])



    const increaseCartValue = (id) => {
        dispatch(increasecartItemvalue(id))
    }

    const decreaseCartValue = (id, cartvalue) => {
        if (cartvalue > 1) {
            dispatch(decreasecartItemvalue(id))
        }
    }

    const removecartItems = (id) => {
        dispatch(removeItem(id))
    }

    const subTotalCartAmount = () => {
        let SubTotalPrice = 0
        Cart.forEach(item => {
            SubTotalPrice = SubTotalPrice + (item.price * item.cartvalue)
        });
        setsubTotalPrice(SubTotalPrice)

    }
    return (
        <>
            <div className="min-h-screen md:mx-7">
                <div className='py-9'>
                    <h2 className='text-center font-bold text-3xl py-10'>
                        My Cart
                    </h2>
                </div>



                {Cart.length > 0 ?
                    <div className="flex flex-col justify-center items-center md:items-start  mx-4 md:flex-row md:justify-between md:mx-1">
                        <div className="items-box  md:flex-grow lg:flex-auto mb-8 ">
                            <Scrollbars autoHeight autoHeightMin={450}>
                                {
                                    Cart.map((cartItem) => {
                                        return (
                                            <div key={cartItem.id}>
                                                <div className=' w-full sm:w-5/6 sm:mx-auto border rounded-lg bg-purple-50 border-purple-100 shadow-sm relative my-1 md:mx-1 md:w-11/12 lg:w-[600px] lg:mx-auto lg:px-5' >
                                                    <div className=' text-2xl right-2 text-red-600 absolute top-2 cursor-pointer hover:text-red-500 hover:scale-125 transition-all duration-200' onClick={() => removecartItems(cartItem.id)}>
                                                        <AiFillMinusCircle />
                                                    </div>
                                                    <div className="flex items-center justify-between mx-2 py-3 sm:mx-5 md:mx-1">
                                                        {/* image shown here */}
                                                        <div className="w-1/3 sm:w-1/5 md:w-1/12 h-auto rounded-md border " >
                                                            <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg " alt="flase" className='h-1/6' />
                                                        </div>

                                                        {/* description shown here */}
                                                        <div className="item-description ">
                                                            <div className="flex ">
                                                                <h4 className='text-lg font-bold'>{cartItem.name}</h4>
                                                            </div>
                                                            <div className='flex text-lg space-x-2 text-slate-400 '>
                                                                <div className='flex'>
                                                                    <p className='text-base'>Color: </p>
                                                                    <div className={`rounded-full w-3 h-3 my-auto mx-2 ${cartItem.color} `}></div>
                                                                </div>
                                                                <div className='flex'>
                                                                    <p className='text-base'>Size: </p>
                                                                    <div className={`rounded-full text-md my-auto mx-2 `}>{cartItem.size}</div>
                                                                </div>

                                                            </div>
                                                            <p className='text-base text-slate-400'>$ 1000</p>
                                                            <div className='text-base flex space-x-2 mt-1'>
                                                                <button className={cartItem.cartvalue > 1 ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => decreaseCartValue(cartItem.id, cartItem.cartvalue)}><AiOutlineMinus /></button>
                                                                <input type="text" className='w-12 pl-5 border border-purple-400' value={cartItem.cartvalue} readOnly />
                                                                <button onClick={() => increaseCartValue(cartItem.id)}><AiOutlinePlus /></button>
                                                            </div>
                                                        </div>
                                                        <div className="totalPrice font-semibold text-lg hidden sm:flex">
                                                            <span>Total: ${cartItem.price * cartItem.cartvalue}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className='  w-full my-3 bg-slate-500 md:w-5/6 lg:w-[600px] lg:mx-auto' />

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
                                <button className='w-full px-4 py-3 bg-purple-500 text-lg hover:bg-purple-600 font-semibold  duration-100 transition-all text-white shadow-md rounded-md'><Link href={'/checkout'}>CheckOut</Link></button>
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



