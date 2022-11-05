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
            <div className='flex justify-center my-2 border mx-1 p-1 bg-slate-50 rounded-md border-slate-500 hover:bg-purple-100' onClick={() => handleAddItem({ ...props.product, cartvalue: 1 })}>
                <button >
                    <BsCartPlus className='text-xl self-center cursor-pointer hover:text-purple-500' />
                </button>
            </div>
        </>
    )
}

export default AddToCartBtn