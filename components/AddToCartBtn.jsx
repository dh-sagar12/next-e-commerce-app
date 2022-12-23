import React from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cart/cartSlice';
import { BsFillCartCheckFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const AddToCartBtn = (props) => {
    const dispatch = useDispatch();
    const cartitem = useSelector(state => state.cartSlice.cart)
    const alreadyAddedProducts = cartitem.find(item => item.product_id === props.product.id)
    const [CartState, setCartState] = useState({})
    

    const handleAddItem = (product) => {
        setCartState(()=>{
            return {}
        })
        // dispatch(addItem(product))
        console.log(product);

    }

    return (
        <>
            {alreadyAddedProducts == undefined ?
                <div className='flex justify-center my-2 border mx-1 p-1 bg-slate-50 rounded-md border-slate-500 hover:bg-purple-100' onClick={() => handleAddItem({ ...props.product, cartvalue: 1 })}>
                    <button >
                        <BsCartPlus className='text-xl self-center cursor-pointer hover:text-purple-500' />
                    </button>
                </div>
                :
                <div className='flex justify-center my-2 border mx-1 p-1 bg-slate-50 rounded-md border-slate-500 hover:bg-purple-100'>
                    <button className='flex justify-center space-x-2'>
                        <BsFillCartCheckFill className='text-xl self-center cursor-pointer hover:text-purple-500' />
                        <span className='font-semibold text-gray-700'>Already Added</span>
                    </button>
                </div>
            }
        </>
    )
}

export default AddToCartBtn