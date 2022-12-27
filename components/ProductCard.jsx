import Link from 'next/link';
import React from 'react'
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { BsFillCartCheckFill,  BsEyeFill } from 'react-icons/bs'



const ProductCard = ({ product }) => {
  const cartitem = useSelector(state => state.cartSlice.cart)
  const alreadyAddedProducts = cartitem.find(item => item.product_id === product.id)



  return (

    <>



      <div className="group  p-1 border border-purple-200  rounded-md transition duration-500 hover:scale-105 hover:shadow-md cursor-pointer " key={product.id}>
        <Link href={`/product/${product.slug}`} passHref>
          <div className="w-full min-h-80  rounded overflow-hidden  aspect-auto">
            {
              product.images[0] !== undefined ?
                <img
                  src={product.images[0].file_name}
                  alt={product.product_name}
                  className="w-full h-full object-center object-cover lg:h-3/4  lg:w-auto md:hover:scale-110 duration-100"
                /> :
                <Skeleton.Image active={true} className='w-full' />

            }
          </div>
        </Link>
        <div className="mt-4 flex justify-between pb-2 px-2 items-center">
          <Link href={`/product/$${product.slug}`} passHref>
            <div>
              <h3 className="text-sm text-gray-900 font-semibold">
                <a href={`/product/$${product.slug}`} className='text-black'>
                  {product.product_name}
                </a>
              </h3>
              <div className='flex space-x-3 text-xs font-semibold text-gray-400'>
                <p>Price Options: $</p>
                <div className='space-x-1'>
                  {product.price_option !== undefined ?

                    product.price_option.map((price, ind) => {
                      return <a className='hover:underline' key={ind}><span className={ind}>{price},</span></a>
                    })

                    : <></>
                  }

                </div>
              </div>
              <div className='flex space-x-3 text-xs font-semibold text-gray-400'>
                <p>Available Options:</p>

                {product.price_option !== undefined ?
                  <a className='hover:underline'>{product.price_option.length}</a> : <></>
                }
              </div>
            </div>
          </Link>
        </div>
        <div>
          {
            alreadyAddedProducts == undefined ?
              <>
                <Link href={`/product/$${product.slug}`} passHref>
                  <div className='flex justify-center my-2 border mx-1 p-1 bg-slate-50 rounded-md border-slate-500 hover:bg-purple-100'>
                    <button className='flex justify-center space-x-2'>
                      <BsEyeFill className='text-xl self-center cursor-pointer hover:text-purple-500' />
                      <span className='font-semibold text-gray-700'>View Product</span>
                    </button>
                  </div>
                </Link>
              </>
              :
              <div className='flex justify-center my-2 border mx-1 p-1 bg-slate-50 rounded-md border-slate-500 hover:bg-purple-100'>
                <button className='flex justify-center space-x-2'>
                  <BsFillCartCheckFill className='text-xl self-center cursor-pointer hover:text-purple-500' />
                  <span className='font-semibold text-gray-700'>Already Added</span>
                </button>
              </div>
          }
        </div>

      </div >
    </>
  )
}

export default ProductCard;