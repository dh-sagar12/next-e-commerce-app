import React from 'react'
import Link from 'next/link'
import AddToCartBtn from './AddToCartBtn'


const ProductItemCard = ({ product }) => {
    const base_url = process.env.baseURL


    return (

        <>


            <div className="group relative p-1 border border-purple-200  rounded-md transition duration-500 hover:scale-105 hover:shadow-md cursor-pointer " key={product.id}>
                <Link href={`/product/$${product.slug}`} passHref>
                    <div className="w-full min-h-80  rounded overflow-hidden  aspect-auto">
                        {
                            product.images[0] !== undefined ?
                                <img
                                    src={`${base_url}${product.images[0]}`}
                                    alt={product.product_name}
                                    className="w-full h-full object-center object-cover lg:h-3/4  lg:w-auto md:hover:scale-110 duration-100"
                                /> :
                                <Skeleton.Image active={true} className='w-full' />

                        }
                    </div>
                </Link>
                <div className="mt-4 flex justify-between pb-2 px-2 items-center">
                    <Link href={`/product/${product.slug}`} passHref>
                        <div>
                            <h3 className="text-sm text-gray-900 font-semibold">
                                <a href={`/product/$${product.slug}`} className='text-black'>
                                    {product.product_name}
                                </a>
                            </h3>
                            <div className='flex space-x-3 text-xs font-semibold text-gray-400'>

                                {
                                    product.store_price == product.retail_price ? <><p>Price :</p><div className='space-x-1'><a className='hover:underline'>${product.retail_price}</a></div></> :
                                        <>
                                            <div className='flex flex-col space-y-2'>
                                                <div className='space-x-1'>Store Price: <a className='hover:underline ml-1'>${product.store_price}</a></div>
                                                <div className='space-x-1'>Discount: <a className='hover:underline ml-1'>${product.discount}</a></div>
                                                <div className='space-x-1'>retail Price: <a className='hover:underline ml-1'>${product.retail_price}</a></div>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <AddToCartBtn product={product} />
                </div>

            </div >
        </>
    )
}

export default ProductItemCard