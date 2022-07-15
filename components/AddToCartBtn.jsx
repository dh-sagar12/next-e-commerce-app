import React from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cart/cartSlice';



const AddToCartBtn = (props) => {
    const dispatch = useDispatch();



    const handleAddItem = (product) => {
        dispatch(addItem(product))
    }

    return (
        <>
            <button onClick={() => handleAddItem({ ...props.product, cartvalue: 1 })}>
                <BsCartPlus className='text-xl self-center cursor-pointer hover:text-purple-500' />
            </button>
        </>
    )
}

export default AddToCartBtn