/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react'
import AddToCartBtn from './AddToCartBtn';
import { message } from 'antd';

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="group relative p-1 border border-purple-200  rounded-md transition duration-500 hover:scale-105 hover:shadow-md cursor-pointer " key={product.id}>
        <Link href={`/product/${product.id}-${product.slug}`} passHref>
          <div className="w-full min-h-80  rounded overflow-hidden  aspect-auto">
            <img
              src={product.imageSrc}
              alt={product.name}
              className="w-full h-full object-center object-cover lg:h-3/4  lg:w-auto md:hover:scale-110 duration-100"
            />
          </div>
        </Link>
        <div className="mt-4 flex justify-between pb-2 px-2 items-center">
          <Link href={`/product/${product.id}-${product.slug}`} passHref>
            <div>
              <h3 className="text-sm text-gray-900 font-semibold">
                <a href={product.href} className='text-black' onClick={()=>{message.info('clicked')}}>
                  {product.name}
                </a>
              </h3>
              <p className="text-sm font-medium text-gray-400">${product.price}</p>
            </div>
          </Link>
          <div>
            <AddToCartBtn product={product} />
          </div>
        </div>

      </div>
    </>
  )
}

export default ProductCard;