/* eslint-disable @next/next/no-img-element */
import { message } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'


const MostPopular = () => {
    const base_url = process.env.baseURL
    const [MostPopularItems, setMostPopularItems] = useState([])

    useEffect(() => {

        fetchPopularItems()

    }, [])

    const fetchPopularItems = () => {
        axios.post(`${base_url}/api/get-popular-items/`, {}).then(res => {
            let result = res.data
            setMostPopularItems(result)
        }).catch(
            err => {
                if (err.message) {
                    message.error(err.message)
                }
                else {
                    message.error('SOMETHING WENT WRONG!!!')
                }
            }
        )
    }


    const popular = [
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
            slug: 'basic-tee'
        },
        {
            id: 2,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
            slug: 'basic-tee'
        },
        {
            id: 3,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
            slug: 'basic-tee'
        },
        {
            id: 4,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
            slug: 'basic-tee'
        },
        {
            id: 5,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
            slug: 'basic-tee'
        },
        {
            id: 6,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
            slug: 'basic-tee'
        }
    ]
    return (
        <>
            <div className="title flex justify-between items-center py-5 px-3 md:px-10 ">
                <h2 className='text-2xl font-bold'> Popular Items</h2>
                <ul className="see-more list-none">
                    <Link href={'/popular'}><a className='text-purple-500 font-semibold underline'>See More</a></Link>
                </ul>
            </div>
            <div className="grid grid-cols-2 gap-1 md:gap-3 px-1 md:grid-cols-4 md:px-10">
                {
                    MostPopularItems.map((prop) => {
                        return (
                            <>
                                <span key={prop.product_inventory_id}>
                                    <Link href={`/product/${prop.slug}`} passHref>
                                        <div className="border border-purple-200 hover:scale-105 duration-500 hover:shadow-md cursor-pointer" key={prop.id}>
                                            <div className="rounded-md  break-inside-avoid-column flex items-center justify-between px-2 ">
                                                <div className=' justify-start h-1/3 w-1/3'>
                                                    <img src={`${base_url}${prop.images[0]}`} alt="alt" className='bg-transparent  hover:scale-105 duration-500 max-h-full max-w-full' />
                                                </div>
                                                <div className='ml-3'>
                                                    <h4 className="font-semibold text-sm sm:text-xl md:text-sm  sm:font-semibold">{prop.product_name}</h4>
                                                    <p className='text-gray-500'>${prop.retail_price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </span>
                            </>
                        )
                    })
                }

            </div>
        </>
    )
}

export default MostPopular