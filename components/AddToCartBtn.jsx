import { message } from 'antd';
import React from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../redux/cart/cartSlice';
import axios from 'axios';


const AddToCartBtn = (props) => {
    const dispatch = useDispatch();
    const cartitem = useSelector(state => state.cartSlice.cart)


    const handleAddItem = (product) => {
        let cart_state = {
            product_id: product.product_id,
            product_inventory_id: product.product_inventory_id,
            cart_qty: product.cartvalue
        }
        let tempItem = cartitem.find(item => item.product_inventory_id === product.product_inventory_id)
        if (tempItem === undefined) {
            axios.post('/api/user/cart/', cart_state).then(res => {
                if (res.data.status == 200) {
                    dispatch(setCartItem(res.data.added_data))
                }
                else {
                    message.error('something went wrong on adding cart')
                }
            }).catch(err => {
                console.warn(err);
            })
        }
    }

    return (
        <>
            <div className='flex justify-center my-2 border mx-1 p-1 cursor-pointer bg-slate-50 rounded-md border-slate-500 hover:bg-purple-100' onClick={() => handleAddItem({ ...props.product, cartvalue: 1 })}>
                <button >
                    <BsCartPlus className='text-xl self-center cursor-pointer hover:text-purple-500' />
                </button>
            </div>

        </>
    )
}

export default AddToCartBtn